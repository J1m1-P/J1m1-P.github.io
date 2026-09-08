# ENPH 253 Mars Habitat Autonomous Robot

> Comprehensive project record for future portfolio pages, resume bullets,
> interviews, and engineering documentation. Last reconstructed: September 5,
> 2026.

## Documentation status

This record was reconstructed from the final team repository, its Git and pull
request history, firmware documentation and source, and UBC's 2026 competition
coverage. It deliberately distinguishes supported facts from details that still
need a team member's confirmation.

- **Verified** details are directly supported by the repository or UBC coverage.
- **Evidence-based interpretations** follow from several artifacts but were not
  stated verbatim by the team.
- **Verify later** marks facts that should not be published yet.

The exact team score, placing, robot name, and full mechanical/electrical bill of
materials are not established by the artifacts reviewed. They are tracked in the
verification backlog rather than guessed.

## Executive summary

I worked on a four-person team to design, build, program, and integrate a fully
autonomous robot for UBC Engineering Physics' 2026 ENPH 253 competition. The
Mars-themed challenge required robots to navigate a course and complete several
different perception and manipulation tasks in two-minute heats: identify a
metal-bearing rock, assemble habitat and radio-tower structures, uncover a solar
panel, and detect hidden Teletubby figures.

The final system distributed work across two ESP32-S3 microcontrollers and a
Raspberry Pi. One ESP32 owned four-wheel X-drive motion, wheel control, tape
following, localization, and the global task sequence. The second owned multi-axis
manipulation, metal sensing, optical-motion sensors, and Pi routing. The Pi ran a
camera and an NCNN-exported YOLO detector. Framed UART links carried commands,
status, readiness, perception results, faults, and odometry.

My work centered on firmware architecture and whole-robot integration. Repository
history supports substantial contributions to motor and encoder drivers, the
X-drive stack, shared communication, tape following, sensor support, safety,
diagnostic tooling, and course sequencing. I was also a recurring integration
point: merging teammates' branches, resolving conflicts, joining drivetrain, arm,
sensing, and vision code, and retuning the autonomous route as hardware changed.

## Project at a glance

| Field | Detail |
| --- | --- |
| Course | UBC ENPH 253: Introduction to Instrument Design |
| Team | Jimmy Pan, Angela Chen, Peter Lu, and Ryan Liu (from repository history) |
| Timeline | Coursework began by May 2026; competition was August 6, 2026 |
| Competition | 2026 UBC Engineering Physics Robot Competition, “Mars Madness” |
| Match format | Fully autonomous, two-minute heats |
| Compute | Two ESP32-S3 DevKitM-1 boards and a Raspberry Pi |
| Mobility | Four-motor, encoder-equipped X-drive |
| Main software | C/C++17, Python, PlatformIO, OpenCV, YOLO, NCNN, Git/GitHub |
| Repository | https://github.com/J1m1-P/Robot-Summer-Team-5 |
| Team result | **Verify later:** score, advancement, and placing are not recorded in the reviewed evidence |

## Competition context and goals

UBC described the 2026 event as a six-week build involving 16 teams. It was called
the most challenging course in the competition's 26-year history because it
combined several distinct technologies. Robots earned points by navigating the
marked surface, finding one metal-bearing rock among six visually identical rocks,
building a habitat and a three-piece radio tower, removing a solar-panel cover,
and flashing a light at hidden Teletubby figures.

Opening-round heats paired two autonomous robots for two minutes. The eight highest
scores advanced to knockout rounds. UBC identifies Randy as the winner and Bucky
as the finalist, but does not connect Team 5 to a robot name or rank; this team's
result must therefore be confirmed separately.

The engineering goal was broader than demonstrating components on a bench. The
robot had to start safely and predictably, move and localize on the real surface,
interact with imperfectly placed objects, coordinate long mechanical operations,
and stop safely when a sensor, link, or action failed. Path choice, action time,
and reliability all affected scoring.

## Robot architecture

```text
                    Camera + GPIO-controlled flash
                               |
                     Raspberry Pi / Python
                       YOLO-NCNN inference
                               |
                       framed UART, 115200
                               |
                      Arm ESP32-S3 / C++
       manipulation, metal detector, optical odometry, Pi bridge
                               |
          command / status / Pi result / odometry packets
                       framed UART, 115200
                               |
                  Drivetrain ESP32-S3 / C++
         mission sequence, pose, motion, tape following
                               |
               four motors + four wheel encoders
```

This partition kept real-time drive control separate from mechanism peripherals
and Linux vision. Its cost was boot-order, protocol, wiring, and integration
complexity: every processor needed explicit ownership, readiness, completion, and
failure semantics.

### Drivetrain and motion

The four-wheel X-drive accepted body-frame forward, lateral, and angular velocity
requests and transformed them into wheel targets. Each wheel used encoder feedback
and a feedforward-plus-PI controller with integral/output bounds. The facade also
owned brake/coast behavior, initialization rollback, telemetry, and a 250 ms command
watchdog.

The committed geometry used 35 mm wheel radius, 30-degree wheel angle, 100 mm
chassis half-length, and 136.5 mm half-width. Body-relative translation and rotation
used fused pose feedback, bounded velocity, speed profiles, and endpoint settling.
Some final actions intentionally remained timed or contact-based when a fixture was
a more reliable reference than dead reckoning.

### Tape following and course registration

Three four-channel reflectance modules were mounted at the front, back, and left,
sharing a multiplexer. Their placement supported travel in multiple X-drive
directions and detection of tape crossings, gaps, and all-channels-on patterns.

The follower formed a weighted center error using `{-3, -1, 1, 3}`, filtered and
deadbanded it, then applied bounded PD steering. If tape disappeared, it swept
toward the last observed side and then across the starting heading before failing.
Stops could depend on distance, time, one tape edge, or an edge-gap-edge pattern.
Alignment routines pivoted around one sensor while another measured body skew,
using field tape as a datum to limit accumulated localization error.

### Localization

Wheel encoders were combined with two PMW3610 optical-motion sensors. The arm ESP32
polled and fused the optical sensors, integrated cumulative pose, and transmitted
odometry packets. The drivetrain converted each new packet back into a body-frame
increment and used encoder increments between optical updates. This “fresh optical
preferred, encoder fallback” strategy provided fast control updates plus a less
slip-sensitive measurement, while tape/contact events supplied occasional absolute
course references.

### Tower mechanism

The radio-tower system used X and Z steppers, a rotation servo, three independent
claw servos, a locator motor, and a contact switch. Its sequence acquired all three
tower pieces, lifted and rotated them, found the destination using locator contact,
and placed the middle, left, and right pieces through parameterized axis/claw
commands. Stepper updates were non-blocking on the arm board, which returned a
command-specific completion status.

### Habitat and solar-panel mechanism

Two more stepper axes and two claw servos handled habitat pieces, normally in
pairs. The final route acquired, transported, and placed habitat components using
stepper positioning plus chassis contact against the base. The same mechanism was
reused to remove the solar-panel cover. A drivetrain-side microswitch provided the
working contact event after the arm-side switch pin was displaced by GPIO conflicts.

### Rock handling and metal sensing

Rock handling combined lift and claw servos with a pulse-oscillator metal detector.
The ESP32 hardware pulse counter measured falling edges in a 100 ms window,
normalized by elapsed time, rejected sub-microsecond glitches, and compared the
result with a freshly captured no-metal baseline. The committed threshold was a
1.5% change.

A read command ran a complete physical state machine: lower/open, sample baseline,
close around a rock, move to the read pose, sample, then retain and lift a detected
rock or release a rejected one. A positive result latched so later checks could
complete immediately once the target was found.

### Raspberry Pi vision

The Pi used OpenCV and Ultralytics YOLO exported to NCNN. The committed runtime
captured 640 x 480 frames and inferred at a 320-pixel model size. It classified four
Teletubby identities, excluded already-flashed targets, chose the unvisited target
closest to image center, and returned identity, confidence, and normalized
horizontal error.

When centered, it flashed a GPIO-controlled light twice and stored the identity.
Repeated Pi-ready beacons prevented scans before camera/model startup. Camera
failure triggered a reopen attempt rather than silently starving requests. A
systemd service started the detector automatically and restarted it after failure.

Earlier branches supported reactive steering/chasing; the final sequence launched
request-driven scans asynchronously and continued after a short capture delay.
**Verify later:** which vision behavior was flashed for the scored run.

### Time-of-flight sensing

The team developed VL53L0X and VL53L5CX drivers, shared-bus address sequencing,
managers, diagnostics, and a browser dashboard. Final pin maps show I2C/XSHUT pins
being disconnected or reassigned, and arm production code disables ToF startup.
It should be described as developed and bench-integrated, not as a final competition
sensor, unless hardware evidence confirms otherwise.

## Hardware inventory

### Confirmed in firmware

- Two ESP32-S3 DevKitM-1 boards.
- Raspberry Pi, camera, and external flash/light on Pi GPIO 18.
- Four DC drive motors with PWM/direction outputs, H-bridge/power stages, shared
  brake, and four quadrature encoder inputs.
- Four stepper channels: tower X/Z and habitat X/Z.
- Eight assigned servo outputs: two habitat claws, tower rotation, three tower
  claws, rock claw, and rock lift.
- Locator motor/contact switch, solar-panel microswitch, and start switch.
- Three multiplexed four-channel tape sensor modules.
- Two PMW3610 optical-motion sensors.
- Pulse-output metal detector connected to ESP32 PCNT.
- Two UART links; developed-but-disabled ToF support.

### Verify before publishing a detailed BOM

- Pi/camera, motor, encoder, wheel, H-bridge, stepper, driver, servo, battery, and
  regulator part numbers;
- robot name, mass, overall dimensions, materials, and fabrication methods;
- power distribution, grounding, fusing, connectors, and wiring harness;
- final mechanism travel, lead screw/belt details, and homing method;
- reflectance sensor and metal-detector circuit details; and
- final installed ToF population, if any.

## Firmware and communication design

The embedded code was layered into drivers, immutable configuration, reusable
control modules, action controllers, and application/task code. `robot-common`
held shared packet types so both ESP32 builds used the same command, status,
odometry, and Pi contracts. Separate PlatformIO environments selected production
or isolated hardware/test entry points.

The drivetrain owned one ordered table containing movement, arm, Pi-scan, and delay
steps. Mechanism implementations stayed inside their action controllers. After the
physical start switch, the arm repeatedly announced readiness. The drivetrain
started the sequence, executed local moves, sent remote commands, and advanced only
after matching completion details. Duplicate or stale reports were ignored; faults
and deadlines stopped progression and forced a safe drive state.

UART frames used:

```text
[0xAA][0x55][version][type][length][payload...][XOR checksum]
```

Message types included odometry, command, status, Pi request/report, and Pi ready.
Reliability features included a resynchronizing byte parser, request IDs, explicit
readiness, command-specific completion, repeated critical announcements, queue
draining on the shared odometry/status link, checksums, and action timeouts. The
small allocation-free protocol was appropriate for the ESP32s, but C and Python
definitions still had to be synchronized manually.

## Important engineering decisions and tradeoffs

### Distributed control

Two ESP32s plus a Pi matched peripheral count and workload: hard real-time drive,
mechanism I/O, and Linux vision stayed separate. The tradeoff was integration risk
across two UARTs and three boot/runtime environments.

### One sequence owner

An earlier generalized `RobotManager` was prototyped and abandoned. The team chose
a simpler drivetrain-owned sequence plus focused arm controllers. Route changes
became fast and visible, but the final table grew long and contained many field-
specific offsets.

### Behavior-based commands

Commands described reusable behavior rather than sequence positions. Matching
completion details prevented an old packet from completing a new step. This made
team contributions composable at the cost of a larger shared protocol contract.

### Hybrid localization and physical registration

Pure odometry would drift; tape following could not cover off-tape manipulation.
The team combined encoder/optical pose with tape, switches, locator contact, and
slow contact against fixtures. Physical datums improved repeatability but introduced
shock and dependence on course tolerances. A redesign should add compliance or
force sensing instead of timed ramming.

### Scope cuts

ToF was disabled after pin/wiring changes, a Wi-Fi control PR was closed, the
RobotManager abstraction was abandoned, and vision flow was simplified. These are
evidence of prioritizing essential scoring paths under a fixed deadline.

## Development evolution and turning points

1. **May–June: foundations.** Individual ESP32, input, interrupt, PWM, tape, and
   H-bridge labs established hardware literacy. Jimmy documented recovery from an
   ESP32 flash MD5 mismatch rather than leaving it as tribal knowledge.
2. **Early July: drivetrain and links.** Jimmy added motor/encoder drivers,
   drivetrain structure, kinematics, UART/I2C foundations, shared types, and safety
   checks. Teammates developed optical, tape, stepper, and controller work in
   parallel branches.
3. **Mid July: hardening.** The team iterated on wheel control, tape turns,
   calibration/fusion, ToF, diagnostic interfaces, and code organization. Jimmy
   repeatedly integrated teammate branches.
4. **Late July: one robot.** Tower and movement behaviors were abstracted, separate
   task flows were consolidated into one sequence, optical pose crossed the ESP
   boundary, and Pi vision was integrated. A July 29 “scored 1 pt” commit records an
   early integrated milestone—not the competition outcome.
5. **Final week: course integration.** Stepper acceleration, servo timing, locator,
   habitat, solar, detector, vision, tape heading, overshoot, and route offsets were
   tuned. Competition-day history includes merges, selective reverts, restored
   metal behavior, and sequence optimization, showing that integration and
   prioritization were the final challenge.

## Failures and debugging stories

### Unsafe motor startup

Motor GPIOs could boot floating, allowing uncommanded full-power motion before
normal initialization. Every motor-driving entry point was required to hold safe
outputs as its first statement, followed by initialization rollback, bounded output,
watchdog, and brake/coast fault paths. The lesson: startup is part of the safety
state machine.

### ESP32 flash corruption

An ESP32 rejected changed firmware with an MD5 mismatch. Suspected causes included
unstable power and simultaneous 3.3/5 V supply. Jimmy documented port discovery,
inspection, and full flash erase with `esptool`, including data-loss consequences.

### Misleading fusion telemetry

Logs almost never showed optical odometry, initially suggesting a broken sensor or
UART path. The control loop ran hundreds of times faster than optical packets, so a
periodic snapshot almost always landed on encoder fallback. The team added sensor-
validity, receive, checksum, parser, decode, sequence, and cumulative source
counters. These proved every fresh optical packet was consumed. The lesson was to
measure events cumulatively when subsystems run at different rates.

### Optical recovery state bug

The PMW3610 layer resumed output after both sensors recovered but left its displayed
last-fault code latched. A targeted fault/recovery test exposed the stale diagnostic
state and verified the reset fix.

### Rotation and static friction

Small controller outputs could be nonzero but physically unable to move the wheels,
causing endpoint stall or oscillation. The team derived an angular deadband of about
0.297 rad/s from X-drive geometry and the measured 0.05 m/s wheel floor, simulated
multiple approaches, and added pulse/pause rotational settling. A hard tolerance
cutoff remained a documented chatter risk.

### Tape and approach behavior

Late fixes addressed lateral drift during heading settle, correction pulsing,
overshoot, small-move stall, and tape-heading alignment. Slower final approaches
and tape datums were more reliable than simply increasing controller aggressiveness.

### UART and GPIO integration

Dedicated Pi UART echo, transmit, receive-only, and scan harnesses isolated link
faults from full-system faults. Meanwhile, GPIO conflicts among I2C, ToF shutdown,
start/solar switches, and metal sensing forced reprioritization. Optional ToF was
cut; an ESP32 strapping-pin risk on the detector input was documented.

## Testing and calibration

- Host-native tests covered hardware-independent kinematics, wheel control,
  odometry, optical adaptation, speed profiles, stall handling, and sequence logic
  with a fake arm UART. Historical checkpoints record 127 drivetrain tests plus
  focused sequence tests passing; rerun before quoting a final count.
- Hardware harnesses isolated single-wheel tuning, full X-drive telemetry,
  drivetrain acceptance, optical fusion, ToF, arm jogging, and Pi UART paths.
- Browser dashboards supplied zero-install control and plots for bench work.
- Duty sweeps and step responses identified feedforward/PI behavior and a practical
  wheel range around 0.05–0.54 m/s. Some robot-level limits could request more than
  this, so combined-motion saturation remained possible.
- Optical and tape calibration tools exposed raw/fused data and tuneable constants.
- Complete course runs tuned offsets, speeds, switch contact, and mechanism timing.

Validation was strong for many pure modules and subsystem boundaries but uneven for
the final combination. Some changes were host-tested but not hardware-tested, and
competition-day route swaps reduced regression time. This should be presented as
an honest time-constrained prototype, not production verification.

## What worked well

- X-drive lateral motion matched the station-alignment problem.
- Compute partitioning matched real-time, peripheral, and vision needs.
- Layering kept math testable and hardware access localized.
- Explicit readiness and matching acknowledgements reduced silent desynchronization.
- One sequence table accelerated late route changes.
- Tape, contact, and switch datums bounded accumulated pose error.
- Harnesses and dashboards made failures observable.
- Fresh-baseline metal sensing reduced drift sensitivity.
- The team cut optional features to protect core functionality.

## Limitations and compromises

- The route depended on empirical offsets, timed moves, and physical ramming.
- Arm and drive actions were mostly sequential; safe parallelism could save time.
- Combined X-drive commands could saturate the measured wheel envelope.
- Some motion APIs blocked while re-entering communication service code.
- C and Python packet contracts were manually mirrored.
- Stepper startup relied on manually adjusted home positions instead of limit-switch
  homing.
- Pin planning changed late and displaced optional sensing.
- Final source retained debug printing, commented route variants, and incomplete
  post-competition cleanup.
- The repository lacks a final schematic, CAD package, BOM, run log, and formal
  competition postmortem.

## Jimmy Pan's contributions and role

Combining his two Git author identities, Jimmy has the largest recorded commit
count. Commit and PR history supports the following contributions:

- early motor and encoder drivers/configuration and drivetrain/X-drive structure;
- UART, I2C, shared `robot-common` types, packets, and cross-board compatibility;
- odometry packets, subsystem safety checks, code organization, and documentation;
- tape-following turns, PID/configuration work, and task-facing interfaces;
- drivetrain test interfaces, sensor support, and VL53L0X/VL53L5CX integration;
- tower action abstraction and early tower pickup/placement sequences;
- consolidation into the unified sequence and generalized movement/action workflow;
- arm dispatcher and Raspberry Pi action path;
- integration of pose-aware motion and request-driven vision;
- locator fixes, habitat/solar tuning, angular adjustments, rock controller and
  metal-detector sequence integration; and
- merging drivetrain, tape, optical, stepper, vision, detector, and habitat branches,
  resolving conflicts, and performing late selective reversions/optimization.

**Evidence-based interpretation:** Jimmy functioned as a firmware and systems
integration lead. His changes span driver, controls, protocol, task, and route
layers, and his PR history repeatedly defines the boundaries where teammates' work
joined. Confirm the team's preferred formal title before publishing “firmware lead.”
A safe statement is:

> I led much of the firmware architecture and whole-robot integration while
> contributing directly to drivetrain, sensing, communication, task sequencing,
> testing, and course tuning.

Leadership examples include creating shared interfaces, making route order editable,
formalizing startup/fault safety, adding diagnostic tools, coordinating merges, and
making scope/reversion decisions during the final week.

## Team collaboration

The history shows shared rather than exclusive ownership. Ryan contributed major
motion/control, optical-odometry, calibration, and tape-alignment work. Angela
contributed tape drivers/control, computer vision, Pi UART integration, detector
behavior, and late rock/Teletubby fixes. Peter contributed stepper/mechanism control
and extensive tower, habitat, and solar sequences. Jimmy built foundational drive
and communication systems and repeatedly integrated those contributions through
the global sequence.

Parallel ownership accelerated progress but made shared files—especially the
sequence—integration hotspots. Branches, PRs, rebases, conflict resolution, and
known-good reversions were part of the engineering, not administrative overhead.

## Competition result — verify

The event date, format, and overall winner are verified, but Team 5's robot name,
opening score, top-eight status, and final rank are not present in reviewed sources.
The July 29 “1 pt” development commit predates competition and must not be presented
as the final result.

Record later: robot name; opening points/tasks; advancement and knockout result;
final rank/award; best practice result; and what happened in the scored run versus
the best complete run.

## What I would redesign

1. Freeze one pin, power, connector, and interface map before optional sensors.
2. Keep authoritative CAD, schematics, BOM, wiring, and structured run logs in Git.
3. Establish a minimum viable scoring route early and require repeated full-run
   success before adding tasks.
4. Add wheel-target desaturation, fixed control cadence, smoother endpoint behavior,
   and a localization model with explicit uncertainty.
5. Replace blocking maneuvers with non-blocking action state machines to support
   clear safety and parallel arm/travel operations.
6. Add limit-switch homing and compliant/force-aware manipulation instead of manual
   home and timed contact.
7. Generate C/Python protocols from one schema and simulate the whole sequence with
   mocked pose, tape, switches, arm, packet loss, and Pi events.
8. Persist telemetry and add hardware-in-the-loop startup/link/sensor regression
   tests.
9. Document the vision dataset, validation metrics, and Pi latency on final hardware.

## Lessons and skills demonstrated

### Technical lessons

- Startup state, static friction, saturation, and wiring can invalidate software
  that looks correct in isolation.
- Distributed controllers need explicit readiness, freshness, identity, completion,
  and fault semantics.
- Physical datums and mechanical tolerance can outperform more dead reckoning.
- Diagnostics must match subsystem rates; cumulative counters can reveal what
  snapshots hide.
- Layered APIs, native-testable math, and isolated harnesses reduce integration risk.

### Team lessons

- Independently working subsystems do not automatically make a working robot.
- Behavior-based interfaces make parallel contributions easier to integrate.
- Scope reduction and rollback are valid engineering decisions under a deadline.
- Documentation is most valuable when it preserves failure reasoning and tests.
- Reliability requires joint mechanical, electrical, controls, and timing decisions.

### Skills

- Embedded C/C++17, ESP32-S3, PlatformIO, Arduino/ESP-IDF GPIO, PWM, UART, I2C,
  PCNT, interrupts, watchdogs, and actuator safety.
- X-drive kinematics, encoders, PI/PD control, speed profiles, friction compensation,
  odometry/fusion, tape following, and autonomous sequencing.
- Raspberry Pi, Linux/systemd, Python, OpenCV, YOLO, NCNN, serial parsing, camera
  recovery, and GPIO control.
- Architecture, protocol design, unit tests, mocks, hardware harnesses, browser
  diagnostics, Git/PR integration, documentation, and technical leadership.

## Interview talking points

1. **Complex system:** explain the three-processor partition and why integrating
   mobility, localization, manipulation, metal sensing, and vision was harder than
   any one driver.
2. **Personal ownership:** lead with firmware architecture/integration, then use the
   drivetrain and unified sequence/protocol as two concrete examples.
3. **Difficult bug:** tell the optical sampling-bias story—instrument each boundary,
   rule out transport/parser faults, then use cumulative counts to prove behavior.
4. **Controls problem:** discuss deriving the angular deadband from wheel tests and
   X-drive geometry, simulating alternatives, and documenting the remaining cutoff.
5. **Tradeoff:** describe cutting ToF after pin conflicts or mixing odometry with
   physical registration instead of pursuing an ideal but fragile approach.
6. **Leadership:** credit teammate subsystem work, then explain shared interfaces,
   integration PRs, conflict resolution, known-good reverts, and sequence ownership.
7. **Redesign:** choose earlier system-interface freeze, homed/compliant mechanisms,
   and whole-route simulation/logged regression tests.

## Resume bullet fact bank

- Led firmware architecture and system integration for a four-person autonomous
  robot, coordinating two ESP32-S3 controllers and a Raspberry Pi over framed UART.
- Developed an encoder-feedback four-wheel X-drive stack with body kinematics,
  per-wheel PI control, odometry, tape following, motion profiles, and watchdogs.
- Unified drivetrain, manipulation, sensing, and vision into an acknowledgement-
  driven sequence for a two-minute autonomous competition.
- Built sensor and diagnostic infrastructure for reflectance arrays, PMW3610
  optical odometry, ToF, metal detection, microswitches, and hardware dashboards.
- Integrated Pi-hosted YOLO/NCNN perception using readiness, request IDs, structured
  results, duplicate-target handling, and camera recovery.
- Coordinated branch/PR integration and made scope/reversion decisions during the
  final competition week.

## Verification backlog

- [ ] Robot name; competition score, tasks completed, advancement, and placing.
- [ ] Best practice-run result and final route time/repeatability.
- [ ] Jimmy's preferred formal role title and mechanical/electrical contributions.
- [ ] Exact build dates: six-week intensive phase versus full May–August course.
- [ ] Final CAD, photos, mass, dimensions, materials, and fabrication methods.
- [ ] Authoritative schematic, power system, wiring plan, and BOM/part numbers.
- [ ] Exact firmware commit/branch flashed for each heat.
- [ ] Which optical, vision, metal, habitat, tower, solar, and ToF features ran in
      the scored heat.
- [ ] Defensible motion accuracy, model accuracy/latency, and reliability metrics.
- [ ] Competition video and future media links.

## Sources and provenance

- Team repository and Git/PR history:
  https://github.com/J1m1-P/Robot-Summer-Team-5
- UBC Engineering recap (August 7, 2026):
  https://engineering.ubc.ca/news/2026/mars-madness-takes-over-annual-ubc-student-robot-competition
- UBC event advisory and task summary:
  https://news.ubc.ca/advisory/ubc-mars-habitat-robot-competition/

When future recollection differs from this record, preserve the distinction between
what was designed, what was committed, what was flashed, and what happened in the
scored run. All four can differ in a fast-moving robotics project.
