import { useEffect, useRef, useState } from "react";
import { terminal } from "../content/terminal.js";

const COMMANDS = {
  help: "Show available commands",
  ls: "List files in a directory",
  cd: "Change directory",
  cat: "Read a file",
  open: "Open a file's configured link",
  pwd: "Print the current directory",
  whoami: "Print the current user",
  clear: "Clear the terminal",
  reboot: "Reload the portfolio",
};

const CAT_IMAGES = [
  "/images/cats/protected/white-lying.png",
  "/images/cats/protected/calico-lying.png",
  "/images/cats/protected/gray-lying.png",
];

const pathLabel = (parts) => (parts.length ? `~/${parts.join("/")}` : "~");
const isFile = (node) => Object.hasOwn(node, "content");

const resolvePath = (input, currentPath) => {
  const rawParts = input?.startsWith("/")
    ? input.split("/")
    : [...currentPath, ...(input || "").split("/")];
  const parts = [];

  rawParts.forEach((part) => {
    if (!part || part === "." || part === "~") return;
    if (part === "..") parts.pop();
    else parts.push(part);
  });

  let node = terminal.files;
  for (const part of parts) {
    if (isFile(node) || !node[part]) return null;
    node = node[part];
  }

  return { node, parts };
};

const TerminalOutput = ({ result }) => {
  if (!result) return null;

  return (
    <div className={result.error ? "terminal-error" : "terminal-output"}>
      {result.text}
      {result.url && (
        <>
          {" "}
          <a href={result.url} target="_blank" rel="noreferrer">
            Open link ↗
          </a>
        </>
      )}
    </div>
  );
};

const Terminal = () => {
  const [catImage] = useState(
    () => CAT_IMAGES[Math.floor(Math.random() * CAT_IMAGES.length)],
  );
  const [currentPath, setCurrentPath] = useState([]);
  const [history, setHistory] = useState([
    { id: 0, result: { text: terminal.welcome.join("\n") } },
  ]);
  const [input, setInput] = useState("");
  const nextId = useRef(1);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({
      top: bodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [history]);

  const runCommand = (rawCommand) => {
    const trimmed = rawCommand.trim();
    if (!trimmed) return;

    const [command, ...args] = trimmed.split(/\s+/);
    const argument = args.join(" ");
    let result;

    switch (command.toLowerCase()) {
      case "help":
        result = {
          text: Object.entries(COMMANDS)
            .map(([name, description]) => `${name.padEnd(7)} ${description}`)
            .join("\n"),
        };
        break;
      case "pwd":
        result = {
          text: `/home/${terminal.user}/${currentPath.join("/")}`.replace(/\/$/, ""),
        };
        break;
      case "whoami":
        result = { text: terminal.user };
        break;
      case "ls": {
        const resolved = resolvePath(argument, currentPath);
        result = !resolved
          ? { text: `ls: ${argument}: No such file or directory`, error: true }
          : isFile(resolved.node)
            ? { text: argument }
            : {
                text: Object.entries(resolved.node)
                  .map(([name, node]) => `${name}${isFile(node) ? "" : "/"}`)
                  .join("  "),
              };
        break;
      }
      case "cd": {
        const resolved = resolvePath(argument || "~", currentPath);
        if (!resolved) {
          result = { text: `cd: ${argument}: No such directory`, error: true };
        } else if (isFile(resolved.node)) {
          result = { text: `cd: ${argument}: Not a directory`, error: true };
        } else {
          setCurrentPath(resolved.parts);
          result = { text: "" };
        }
        break;
      }
      case "cat":
      case "open": {
        const resolved = resolvePath(argument, currentPath);
        if (!argument || !resolved) {
          result = {
            text: `${command}: ${argument || "missing file"}: No such file`,
            error: true,
          };
        } else if (!isFile(resolved.node)) {
          result = { text: `${command}: ${argument}: Is a directory`, error: true };
        } else if (command === "open" && !resolved.node.url) {
          result = { text: `open: ${argument}: No link configured`, error: true };
        } else if (command === "open") {
          result = { text: "Ready to open:", url: resolved.node.url };
        } else {
          result = { text: resolved.node.content, url: resolved.node.url };
        }
        break;
      }
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "reboot":
        result = { text: "Rebooting..." };
        window.setTimeout(() => window.location.reload(), 1000);
        break;
      default:
        result = { text: `${command}: command not found`, error: true };
    }

    setHistory((items) => [
      ...items,
      {
        id: nextId.current++,
        command: trimmed,
        path: pathLabel(currentPath),
        result,
      },
    ]);
    setInput("");
  };

  return (
    <div className="terminal-shell">
      <div className="terminal-cat" aria-hidden="true">
        <img src={catImage} alt="" />
      </div>

      <section
        className="terminal-panel"
        aria-label="Interactive portfolio terminal"
        onClick={() => inputRef.current?.focus()}
      >
      <header className="terminal-toolbar">
        <div className="terminal-controls" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span>
          {terminal.user}@{terminal.host}: {pathLabel(currentPath)}
        </span>
      </header>

      <div className="terminal-body" ref={bodyRef}>
        {history.map((entry) => (
          <div className="terminal-entry" key={entry.id}>
            {entry.command && (
              <div>
                <span className="terminal-prompt">
                  {terminal.user}@{terminal.host}:{entry.path}$
                </span>{" "}
                {entry.command}
              </div>
            )}
            <TerminalOutput result={entry.result} />
          </div>
        ))}

        <form
          className="terminal-form"
          onSubmit={(event) => {
            event.preventDefault();
            runCommand(input);
          }}
        >
          <label htmlFor="terminal-command">
            {terminal.user}@{terminal.host}:{pathLabel(currentPath)}$
          </label>
          <input
            id="terminal-command"
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck="false"
            aria-label="Terminal command"
          />
        </form>
      </div>

      <footer className="terminal-suggestions" aria-label="Suggested commands">
        {terminal.shortcuts.map((command) => (
          <button type="button" onClick={() => runCommand(command)} key={command}>
            {command}
          </button>
        ))}
      </footer>
      </section>
    </div>
  );
};

export default Terminal;
