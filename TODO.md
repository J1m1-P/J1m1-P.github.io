# Remaining work

## Before publishing

- Verify that all three current project titles, descriptions, tags, and images
  describe Jimmy's real work; they appear to originate from template content.
- Add real project website and repository URLs where available.
- Add the public resume URL to `src/content/site.js`.
- Add email, GitHub, and LinkedIn URLs to `contactLinks` in `src/content/site.js`.
- Replace generic technology-logo alt labels with the actual technology names.
- Confirm whether the displayed cumulative average should remain public and
  keep it current.

## Recommended follow-up

- Add lightweight route/interaction tests once the content stabilizes.
- Audit and remove dependencies that remain from the original template but are
  not imported by the application, updating the lockfile with npm.
- Consider self-hosting the Mona Sans font to avoid a runtime Google Fonts
  request and improve offline reliability.
