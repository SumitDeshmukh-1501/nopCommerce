planning/authentication-test-plan.md
====================================
Title: Authentication Test Plan
Feature ID: FT-AUTH-001
Version: 1.0
Date: 2026-08-05
Author: Test Planner Agent

1. Feature Summary
------------------
Feature Name:
Authentication (Admin Portal)

Description:
Allows registered administrators to securely authenticate to the admin area using email and password. Includes login, logout, session management and protections against common attacks (SQL Injection, XSS). After successful login the administrator is redirected to the admin dashboard. Sessions are invalidated on logout and expire after idle timeout.

2. Business Goal
----------------
- Allow authorized administrators to access the admin portal.
- Prevent unauthorized access to admin pages.
- Ensure login inputs are validated client- and server-side.
- Protect authentication flow against SQL Injection and XSS.
- Invalidate sessions on logout and after idle timeout.
- Ensure protected pages cannot be accessed after logout (including via Back).

3. Overview and Objectives
--------------------------
Objectives:
- Validate all functional and security acceptance criteria listed in requirements/authentication.md (REQ-001 through REQ-010).
- Provide test cases and coverage sufficient for automation with Playwright.
- Produce a prioritized list of tests for immediate automation (smoke, security, regression).
- Ensure traceability of each test to corresponding REQ-*.

4. Scope
---------
In-scope:
- Administrator login using email + password.
- Field validation: mandatory checks, email format, max length checks.
- Validation of invalid credentials (wrong email / password).
- Security validation: SQL Injection, XSS.
- Session expiration (idle timeout).
- Logout and post-logout protection (Back button, protected page access).
- Non-functional checks for login response time, HTTPS and cookie flags.

Out-of-scope:
- Forgot password and reset flows
- Multi-factor authentication (MFA)
- Social login / SSO
- Password complexity enforcement beyond max-length
- Account management (create/delete admin accounts)

5. References
-------------
- Requirements file: C:\Users\Sumeet\OneDrive\Desktop\nopCommerce\requirements\authentication.md
- Target URL (test target): https://admin-demo.nopcommerce.com/login?returnUrl=%2Fadmin%2F
- Feature ID: FT-AUTH-001

6. Assumptions
--------------
- Administrator test accounts exist or can be provisioned.
- Backend authentication service and user DB available in test environment.
- Test environment can be configured for shorter session timeout for testing.
- Browser cookies are enabled in test environment.
- Test environment TLS certificate valid (or test harness allows HTTPS).
- Automation team has permission to run security tests in the environment.

7. Dependencies
---------------
- Authentication API / backend service
- User database seeded with test admin accounts
- Session management service and configuration (idle timeout)
- Authorization middleware for protected routes
- CI secrets manager for credentials

8. Risks
--------
- Test environment not matching production timeout settings (affects session tests)
- Sensitive test credentials leaking if not secured
- API instability causing intermittent failures
- If test environment is publicly reachable, automated security scans may be blocked
- Differences in UI text/labels or localization could break locators if not robust
- Lack of stable attributes (data-testids) in DOM increases locator fragility

9. Test Strategy
----------------
- Automatable: Most functional scenarios, boundary tests, many security checks (input injection), and non-functional checks (response time, cookie flags).
- Partially automatable: Some security validations where manual inspection of logs or DB state is required (e.g., verifying no DB modifications).
- Manual validation required: visual confirmation of no XSS alert in certain browser contexts or code review for sanitization if instrumentation absent.

Prioritization:
- Smoke: TS001 (Valid Login), TS012/TS013 (Logout & Session invalidation)
- Security (High): TS010 SQL Injection, TS011 XSS
- Regression: All functional and boundary cases
- Performance/Security: Non-functional tests (response time, HTTPS, cookie flags)

10. Test Matrix (REQ -> Scenario mapping)
-----------------------------------------
- REQ-001 (valid login)  -> TS001
- REQ-002 (invalid password) -> TS002
- REQ-003 (invalid email/unregistered) -> TS003
- REQ-004 (mandatory fields) -> TS004, TS005, TS006
- REQ-005 (email format / max length) -> TS007, TS008
- REQ-006 (SQL Injection protection) -> TS010
- REQ-007 (XSS sanitization) -> TS011
- REQ-008 (session expiration) -> TS012
- REQ-009 (logout invalidates session) -> TS013
- REQ-010 (Back button protection after logout) -> TS014

11. Modules (UI areas to test)
------------------------------
- Login Page
  - Email field
  - Password field
  - Login / Submit control
  - Validation message area
- Dashboard (protected area)
- Logout control (header / user menu)
- Session & cookie handling (Set-Cookie headers)
- Protected routes (direct URL access)

12. Test Scenarios (Summary list)
---------------------------------
TS001 — Verify successful login (REQ-001) — High — Smoke / Functional  
TS002 — Verify invalid password rejected (REQ-002) — High — Negative / Regression  
TS003 — Verify invalid/unregistered email rejected (REQ-003) — High — Negative / Regression  
TS004 — Verify blank email & password validation (REQ-004) — High — Negative / Validation  
TS005 — Verify missing email field validation (REQ-004) — Medium — Negative  
TS006 — Verify missing password validation (REQ-004) — Medium — Negative  
TS007 — Verify invalid email format rejected (REQ-005) — High — Negative / Validation  
TS008 — Verify email max length boundary (REQ-005) — Medium — Boundary  
TS009 — Verify password max length boundary (REQ-005) — Medium — Boundary  
TS010 — Verify protection against SQL Injection (REQ-006) — High — Security  
TS011 — Verify XSS sanitization (REQ-007) — High — Security  
TS012 — Verify session expires after idle timeout and redirect to login (REQ-008) — High — Session / Regression  
TS013 — Verify logout invalidates session (REQ-009) — High — Regression / Security  
TS014 — Verify Back button / browser history cannot restore protected pages after logout (REQ-010) — High — Regression / Security  
TS015 — Verify password case sensitivity (Business rule) — Medium — Functional  
TS016 — Verify email case insensitivity (Business rule) — Medium — Functional  
TS017 — Access protected page without authentication is blocked -> redirect to login — High — Security  
TS018 — Login response performance under 3 seconds — Medium — Non-functional / Performance  
TS019 — Verify HTTPS and secure cookie flags (Secure, HttpOnly, SameSite) — High — Security / Non-functional  
TS020 — Concurrent login attempts / session reuse (attempt session reuse after logout) — Medium — Session / Security  
TS021 — Edge cases: whitespace, unicode, long input, special characters — Low — Edge Cases

13. Detailed Test Cases
-----------------------
(Each test case includes: ID, Title, Requirement Trace, Priority, Type, Preconditions, Test Data, Steps, Expected Result, Cleanup)

Common preconditions for many cases:
- Test environment reachable at: https://admin-demo.nopcommerce.com/login?returnUrl=%2Fadmin%2F
- Environment variables present for valid admin credentials:
  - ADMIN_EMAIL (e.g., example placeholder: admin@example.com) — store in CI secrets, do not commit
  - ADMIN_PASSWORD (e.g., Example placeholder: AdminPass!23) — store in CI secrets
- Browser profile cleared (cookies/local storage) before each test

Note: where actual test credentials are required, tests must reference environment variables rather than hard-coded credentials.

TS001 — Verify successful login
- Requirement Trace: REQ-001
- Priority: High
- Type: Smoke / Functional
- Preconditions: Valid admin credentials available in env variables; network reachable
- Test Data: ADMIN_EMAIL, ADMIN_PASSWORD
- Steps:
  1. Navigate to the login URL.
  2. Locate the Email field (use accessible label "Email") and enter ADMIN_EMAIL.
  3. Locate the Password field (label "Password") and enter ADMIN_PASSWORD.
  4. Click or submit the login control.
  5. Wait for navigation to the admin dashboard or for a stable indication of successful login.
- Expected Result:
  - User is redirected to the admin dashboard (URL contains /admin or page shows dashboard elements).
  - A session cookie is set (Set-Cookie header present) and the cookie has expected attributes.
  - No error message displayed.
- Cleanup:
  - If still logged in, perform logout to reset session; clear cookies.

TS002 — Verify invalid password is rejected
- Requirement Trace: REQ-002
- Priority: High
- Type: Negative / Regression
- Preconditions: Valid email exists
- Test Data: ADMIN_EMAIL, WRONG_PASSWORD (e.g., "wrongpass123")
- Steps:
  1. Navigate to login page.
  2. Enter ADMIN_EMAIL in Email field.
  3. Enter WRONG_PASSWORD in Password field.
  4. Click Login.
- Expected Result:
  - Authentication fails; user remains on login page.
  - Generic error message displayed (e.g., "login failed" or "invalid credentials"); no sensitive system info.
  - No session cookie created / no dashboard access.
- Cleanup: clear cookies.

TS003 — Verify invalid/unregistered email is rejected
- Requirement Trace: REQ-003
- Priority: High
- Type: Negative
- Preconditions: Unregistered email not present in DB
- Test Data: INVALID_EMAIL = "not.exists@example.com", ADMIN_PASSWORD
- Steps:
  1. Navigate to login page.
  2. Enter INVALID_EMAIL in Email field.
  3. Enter ADMIN_PASSWORD in Password field.
  4. Click Login.
- Expected Result:
  - Authentication fails; user remains on login page.
  - Generic error message displayed; no details revealing whether email exists.
  - No session created.
- Cleanup: clear cookies.

TS004 — Verify blank email & password validation
- Requirement Trace: REQ-004
- Priority: High
- Type: Negative / Validation
- Preconditions: None
- Test Data: Email = "", Password = ""
- Steps:
  1. Navigate to login page.
  2. Leave Email and Password empty.
  3. Click Login.
- Expected Result:
  - Client-side and/or server-side validation prevents submission or returns validation errors.
  - Error messages displayed for both mandatory fields (or at least for the missing fields).
  - No session created.
- Cleanup: none.

TS005 — Verify missing email field validation
- Requirement Trace: REQ-004
- Priority: Medium
- Type: Negative
- Preconditions: None
- Test Data: Email = "", Password = ADMIN_PASSWORD
- Steps:
  1. Navigate to login page.
  2. Leave Email blank and enter ADMIN_PASSWORD.
  3. Click Login.
- Expected Result:
  - Validation error for Email field; login rejected.
- Cleanup: none.

TS006 — Verify missing password field validation
- Requirement Trace: REQ-004
- Priority: Medium
- Type: Negative
- Preconditions: None
- Test Data: Email = ADMIN_EMAIL, Password = ""
- Steps:
  1. Navigate to login page.
  2. Enter ADMIN_EMAIL; leave Password blank.
  3. Click Login.
- Expected Result:
  - Validation error for Password field; login rejected.
- Cleanup: none.

TS007 — Verify invalid email format is rejected
- Requirement Trace: REQ-005
- Priority: High
- Type: Negative / Validation
- Preconditions: None
- Test Data: Bad emails e.g., "plainaddress", "user@localhost", "missing@dot", "user@.com"
- Steps:
  1. Navigate to login page.
  2. Enter invalid format value into Email field.
  3. Enter any string into Password field.
  4. Click Login.
- Expected Result:
  - Client-side validation flags invalid email format or server returns invalid-email error.
  - Login not attempted if format validation triggers on client.
- Cleanup: none.

TS008 — Verify email max length boundary (100 chars)
- Requirement Trace: REQ-005 (max length)
- Priority: Medium
- Type: Boundary / Validation
- Preconditions: None
- Test Data:
  - Email with length = 100 chars (valid format if possible)
  - Email with length = 101 chars (should be rejected)
- Steps:
  1. Navigate to login page.
  2. Enter 100-char email, provide password, click Login — expect server-side behavior.
  3. Repeat with 101-char email.
- Expected Result:
  - 100-char email is accepted for validation (then subject to authentication).
  - 101-char email triggers validation error or is rejected.
- Cleanup: none.

TS009 — Verify password max length boundary (100 chars)
- Requirement Trace: REQ-005 (password max length)
- Priority: Medium
- Type: Boundary / Validation
- Preconditions: None
- Test Data:
  - Password length = 100 chars
  - Password length = 101 chars
- Steps:
  1. Navigate to login page.
  2. Enter valid email.
  3. Enter password sized to 100 chars and attempt login.
  4. Enter password sized to 101 chars and attempt login.
- Expected Result:
  - 100-char password accepted; 101-char triggers validation error or rejection.
- Cleanup: none.

TS010 — Verify protection against SQL Injection
- Requirement Trace: REQ-006
- Priority: High
- Type: Security (Automation + Manual review)
- Preconditions:
  - Test environment isolated (no risk to production DB).
  - Logging/monitoring enabled to detect attempted injection.
- Test Data / Payload examples:
  - Classic payloads: ' OR '1'='1
  - "'; DROP TABLE users; --"
  - "admin' --"
  - Time-based: "'; WAITFOR DELAY '00:00:05'--"
- Steps:
  1. Navigate to login page.
  2. Enter SQL injection payload into Email field with any password; attempt login.
  3. Repeat with payload in Password field.
  4. Observe responses and application behavior; check backend logs if permitted.
- Expected Result:
  - Login fails with generic error message.
  - No SQL syntax or DB errors returned to client.
  - Database not altered (no dropped/tampered tables).
  - Application treats payload as data (escaped/sanitized/parameterized).
  - If time-based payloads used, no unexpected delays indicating server executed SQL.
- Cleanup:
  - Confirm DB unchanged (if DB verification permitted).
  - Clear any created logs or artifacts only if authorized.

TS011 — Verify XSS sanitization
- Requirement Trace: REQ-007
- Priority: High
- Type: Security
- Preconditions: Environment permitted for security test
- Test Data / Payload examples:
  - "<script>alert('xss')</script>"
  - "\"><img src=x onerror=alert(1)>"
  - "%3Cscript%3Ealert(1)%3C%2Fscript%3E" (encoded)
- Steps:
  1. Navigate to login page.
  2. Enter XSS payload into Email and Password fields (one at a time).
  3. Submit login.
  4. Observe whether any script executes or any markup is reflected unescaped anywhere (error messages, logs rendered to UI).
- Expected Result:
  - No script executes (no alert/popups).
  - Reactive UI does not reflect the payload unescaped. Any reflected output is encoded/escaped.
  - Application returns safe, sanitized output; no DOM-based or stored XSS occurs.
- Cleanup: clear cookies, clear any stored data if environment allows.

TS012 — Verify session expires after idle timeout and redirect to Login
- Requirement Trace: REQ-008
- Priority: High
- Type: Session / Regression
- Preconditions:
  - Idle timeout configurable in test environment (recommend set to short interval, e.g., 60 seconds, for test)
- Test Data: ADMIN_EMAIL, ADMIN_PASSWORD
- Steps:
  1. Login successfully.
  2. Remain idle for (timeout + delta) seconds.
  3. Attempt to navigate to a protected page (e.g., refresh dashboard or access endpoint).
- Expected Result:
  - User is redirected to the login page or receives authentication challenge (401).
  - Old session cookie rejected / no longer grants access.
- Cleanup: none.

TS013 — Verify logout invalidates session
- Requirement Trace: REQ-009
- Priority: High
- Type: Regression / Security
- Preconditions: User currently logged in
- Test Data: ADMIN_EMAIL, ADMIN_PASSWORD
- Steps:
  1. Login successfully.
  2. Click Logout control.
  3. After logout, attempt to reload the dashboard or directly access a protected URL.
- Expected Result:
  - Logout returns the user to the login page.
  - Accessing protected URLs redirects to login or returns 401.
  - Session cookie is removed or server rejects the session token.
- Cleanup: clear cookies.

TS014 — Verify Back button cannot restore authenticated pages after logout
- Requirement Trace: REQ-010
- Priority: High
- Type: Regression / Security
- Preconditions: User logged in
- Test Data: ADMIN_EMAIL, ADMIN_PASSWORD
- Steps:
  1. Login successfully, navigate to Dashboard.
  2. Click Logout.
  3. Use browser Back button.
  4. Observe whether dashboard content is visible or whether user is redirected to login.
- Expected Result:
  - Browser Back must not display sensitive content; user should be required to authenticate again (redirect to login or show placeholder that requires re-authentication).
- Cleanup: clear history / cookies.

TS015 — Verify password case sensitivity
- Requirement Trace: Business rule (passwords case-sensitive)
- Priority: Medium
- Type: Functional / Regression
- Preconditions: Known password with mixed-case characters (or simulate)
- Test Data: ADMIN_EMAIL, ADMIN_PASSWORD (with case), ADMIN_PASSWORD_LOWERCASE (modified)
- Steps:
  1. Attempt login with password deviating only by case.
- Expected Result:
  - Authentication fails if case does not match; passwords are case-sensitive.
- Cleanup: none.

TS016 — Verify email case insensitivity
- Requirement Trace: Business rule (emails case-insensitive)
- Priority: Medium
- Type: Functional
- Preconditions: Admin account exists with known email
- Test Data: ADMIN_EMAIL in mixed case variants (e.g., Admin@Example.COM)
- Steps:
  1. Attempt login using email with different casing but same characters.
- Expected Result:
  - Authentication succeeds if other credentials correct (email comparison should be case-insensitive).
- Cleanup: none.

TS017 — Verify protected page access blocked without authentication
- Requirement Trace: REQ-009/REQ-010/General Security
- Priority: High
- Type: Security
- Preconditions: Not logged in
- Steps:
  1. Navigate directly to a protected route (e.g., /admin/dashboard) without authentication.
- Expected Result:
  - Redirect to login page or 401/403; no protected content rendered.
- Cleanup: none.

TS018 — Verify login performance: response < 3 seconds
- Requirement Trace: Non-functional (NFR)
- Priority: Medium
- Type: Performance / Non-functional
- Preconditions: Network baseline acceptable
- Steps:
  1. Using an automated test tool, measure time from login request submission to dashboard load or final authentication response.
  2. Run 5 attempts and record median time.
- Expected Result:
  - Median login response time < 3000 ms for the test environment.
- Cleanup: none.

TS019 — Verify HTTPS enforcement and secure cookie flags
- Requirement Trace: Non-functional security
- Priority: High
- Type: Security / Non-functional
- Preconditions: HTTPS available
- Steps:
  1. Load login URL over HTTP (if supported) and verify redirection to HTTPS.
  2. Perform login and inspect Set-Cookie header(s) on response.
- Expected Result:
  - Pages served via HTTPS.
  - Session cookies have Secure and HttpOnly flags set, and SameSite policy is present (Lax/Strict as per policy).
- Cleanup: none.

TS020 — Concurrent login attempts and session reuse check
- Requirement Trace: Session / Security
- Priority: Medium
- Type: Session / Security
- Preconditions: Two different browsers or parallel sessions
- Steps:
  1. Login in Browser A.
  2. Login in Browser B (same credentials).
  3. Perform logout in Browser A; then attempt action in Browser B.
- Expected Result:
  - Depending on business rule, either concurrent sessions permitted or session invalidated across all sessions. If requirement expects invalidation, access from Browser B must be denied after logout in Browser A. If concurrent allowed, ensure logout only affects that session.
- Cleanup: ensure all sessions logged out.

TS021 — Edge cases: whitespace, unicode, special chars
- Requirement Trace: Validation / Security
- Priority: Low
- Type: Edge Case
- Preconditions: None
- Test Data: email with leading/trailing spaces, unicode characters, emoji, long special char strings
- Steps:
  1. Input each edge-value into Email/Password fields and submit.
- Expected Result:
  - Validation behaves as expected: leading/trailing spaces trimmed or rejected per design; no crashes; no injection possible.
- Cleanup: none.

14. Edge Cases (special attention)
---------------------------------
- Empty strings, only whitespace
- Max length + 1 (100 -> 101)
- Email with unicode (Emoji or non-Latin scripts)
- Email local part with unusual but valid characters
- Passwords with only special characters
- Inputs that combine XSS + SQL payloads
- Large payloads to the login fields (to test denial-of-service or buffering)

15. Validation Checklist
------------------------
For each test run validate:
- Mandatory fields enforced (email, password).
- Client and server-side validation present for email format.
- Field maximum lengths enforced (<= 100 chars each).
- Error messages are generic (do not reveal DB or stacktrace).
- Login button disabled when form invalid (if applicable).
- Successful login shows expected admin dashboard elements.
- Logout invalidates server session token.
- Session cookies have Secure, HttpOnly, and SameSite attributes.
- HTTPS enforced (no plain HTTP forms allowed).
- No stored/reflected XSS executions.
- No SQL error messages revealed to client.
- Protected pages cannot be accessed post-logout.

16. Test Data
-------------
- Valid Admin (placeholder — use env variables):
  - ADMIN_EMAIL: set in CI/Secrets (example placeholder: admin@example.com)
  - ADMIN_PASSWORD: set in CI/Secrets (example placeholder: AdminPass!23)
- Invalid combinations:
  - Wrong password: wrongpass123
  - Unregistered email: not.exists@example.com
- SQL Injection payloads:
  - "' OR '1'='1"
  - "'; DROP TABLE users; --"
  - "' OR 1=1 --"
- XSS payloads:
  - "<script>alert('xss')</script>"
  - "\"><img src=x onerror=alert(1)>"
- Boundary strings:
  - 100-char string (repeat 'a' 100 times)
  - 101-char string (repeat 'a' 101 times)
- Environment variables recommended:
  - ADMIN_EMAIL
  - ADMIN_PASSWORD
  - BASE_URL (e.g., https://admin-demo.nopcommerce.com)
  - SESSION_TIMEOUT_OVERRIDE (when environment supports changing timeout)
  - TEST_ASSUME_ISOLATED (flag to gate security tests)

17. Security Test Cases (details & payloads)
-------------------------------------------
- SQL Injection payloads: "' OR '1'='1"; "'; DROP TABLE users; --"; time-based attacks "'; WAITFOR DELAY '00:00:05'--"
  - Expected sanitization behavior:
    - No DB commands executed.
    - Input treated as string; parameterized queries used.
    - No stacktrace or DB error details leaked in UI.
    - Response time should not indicate execution of malicious SQL (e.g., no unexpected delays).
- XSS payloads: "<script>alert(1)</script>", "<img src=x onerror=alert(1)>", encoded payloads
  - Expected sanitization behavior:
    - Browser must not execute incoming scripts.
    - Input is escaped/encoded before rendering.
    - No reflected or stored XSS is possible from login fields.
- Additional checks:
  - Check server logs for exception messages (if accessible).
  - Ensure Content-Security-Policy (CSP) present in headers (recommended).
  - Ensure sanitized error messages.

18. Session and Logout Tests
----------------------------
- Session timeout:
  - Configure lower timeout in test environment (e.g., 60s).
  - Login -> idle -> attempt -> redirected to login.
- Logout:
  - Logout should invalidate server-side session token.
  - Cookies cleared (or server rejects subsequent requests).
- Back button:
  - After logout, Back should not restore a page with sensitive content; must require reauthentication.
- Session reuse:
  - Attempt to use a saved cookie/session token after logout should fail.

19. Negative and Boundary Tests (explicit list)
------------------------------------------------
- Blank email, blank password
- Only whitespace in email/password
- Invalid email formats (missing @, missing domain, spaces)
- Over-length email/password (>100 chars)
- Password case differences
- Email case variations (must be case-insensitive)
- Special chars and unicode in input
- Rapid repeated login attempts (rate-limiting behavior - if applicable)
- Simultaneous login/logout race conditions

20. Non-Functional Tests
------------------------
- Login response time < 3 seconds (REQ: NFR)
  - Measure median and 95th percentile over X runs
- HTTPS enforcement and certificate check
- Cookie attributes: Secure, HttpOnly, SameSite
- Load/Stress (optional): concurrency tests to validate session management under load
- Browser compatibility: Chromium, Firefox, WebKit (headless + headed verification)

21. Automation Feasibility
--------------------------
- Fully Automatable:
  - Positive login, negative login, validation, boundary checks, session expiry detection (timed), logout, back-button behavior, cookie header checks, HTTPS checks, response time measurement.
- Partially Automatable:
  - Security tests requiring DB confirmation (may need DB access).
  - XSS detection sometimes requires manual inspection for UI prompt popups (use headless detection and page.on('dialog') handlers).
- Manual/Review Required:
  - Confirming no DB changes for destructive SQL payloads without DB access
  - Reviewing logs for injection attempts if not surfaced to UI
- Recommendation:
  - Automate as much as possible. Gate destructive security tests in a dedicated isolated environment with DB snapshots.

22. Automation Notes (Playwright-focused)
-----------------------------------------
Note: Per planning best practices we avoid producing brittle selectors. Provide robust locator guidance and recommendations to the dev team to enable stable automation.

Recommended Playwright folder structure (suggested):
- tests/
  - authentication/
    - 001-login.spec.ts
    - 002-negative.spec.ts
    - 003-security.spec.ts
    - 004-session.spec.ts
    - 005-boundary.spec.ts
    - 006-performance.spec.ts
- test-data/
  - authentication.json (or .ts fixtures that read env vars)
- fixtures/
  - auth.fixtures.ts (test fixtures to provide logged-in state if allowed)
- planning/
  - authentication-test-plan.md
- reports/
- playwright.config.ts

Suggested spec file names:
- tests/authentication/001-login.spec.ts
- tests/authentication/002-negative.spec.ts
- tests/authentication/003-security.spec.ts
- tests/authentication/004-session.spec.ts
- tests/authentication/005-boundary.spec.ts
- tests/authentication/006-performance.spec.ts

Locator / selector guidance (do NOT hard-code brittle selectors in the plan):
- Preferred: Add stable attributes in the DOM from devs: data-testid="login-email", data-testid="login-password", data-testid="login-submit".
- Primary locator strategies (recommended, resilient):
  - By accessible label: page.getByLabel('Email'), page.getByLabel('Password')
  - By role and name: page.getByRole('button', { name: /log in|sign in/i })
  - By test-id attributes: page.getByTestId('login-email') — requires dev adding data-testid.
- Fallback strategies:
  - input[name="Email"] or input[type="email"] for email field
  - input[type="password"] for password
  - button[type="submit"] or form submit
- Do NOT rely on fragile selectors like absolute XPaths or index-based selectors.

Waiting and synchronization techniques:
- Prefer Playwright auto-waiting (click and fill wait).
- Use page.waitForURL(/\/admin/) or expect(page).toHaveURL(/\/admin/).
- Use waitForResponse to validate backend response with status 200/401 when appropriate.
- Use locator.waitFor({ state: 'visible', timeout: ... }) for UI readiness.
- Avoid fixed sleep() — only use when necessary for session timeout tests (document the wait time).

Environment variables and secrets:
- Store credentials in CI secrets (GH Secrets, Azure Key Vault, etc.)
- Recommended env var names:
  - ADMIN_EMAIL
  - ADMIN_PASSWORD
  - BASE_URL
  - SESSION_TIMEOUT_OVERRIDE (optional)
  - CI (boolean)
- Locally use .env (gitignored) or test-specific vault.

Test data management:
- Keep test data externalized in test-data JSON files or fixtures that read from environment variables.
- Use factory or seed scripts (outside of UI tests) to create/restore admin accounts in test environments.

Retries, parallelization, and ordering:
- Configure Playwright retries in CI (e.g., 1-2 retries for flaky tests).
- Run smoke tests sequentially in CI early stage (critical path), then allow parallelization in regression runs.
- Use test.describe('smoke', () => { test.fixme(...) }) or test annotations (tags) to control grouping.
- Set workers to auto (default) but make session-sensitive tests single-worker if they share state.

Selectors policy for handoff:
- Request the dev team to add consistent data-testids for critical auth controls.
- If not available, use accessible locators (labels/roles) as primary strategy.

23. Priority list for automation (order to automate)
---------------------------------------------------
1. Smoke (Immediate Automation)
   - TS001 Valid Login
   - TS013 Logout invalidates session
   - TS014 Back button after logout
2. Security (High Priority)
   - TS010 SQL Injection
   - TS011 XSS
3. Core Negative & Boundary
   - TS002 Invalid password
   - TS003 Invalid/unregistered email
   - TS004 Blank credentials
   - TS007 Invalid email format
   - TS008/TS009 Max-length boundary tests
4. Session tests
   - TS012 Session timeout
   - TS020 Session reuse/Concurrent sessions
5. Non-functional
   - TS018 Response time
   - TS019 HTTPS/Cookie flags
6. Edge cases & extended tests
   - TS021 Unicode/whitespace/long inputs

24. Estimated Effort (T-shirt sizing & hours)
--------------------------------------------
Estimates assume test engineer familiar with Playwright and pre-provisioned test environment.

- Smoke tests (TS001, TS013, TS014): Small (S) — 8–12 hours total (author tests, automation)
- Security (TS010, TS011): Medium (M) — 12–20 hours (automation + review + safe environment config)
- Negative & Boundary (TS002, TS003, TS004, TS005, TS006, TS007, TS008, TS009): Medium (M) — 16–24 hours
- Session tests (TS012, TS020): Small to Medium (S/M) — 8–12 hours
- Non-Functional (TS018, TS019): Medium (M) — 8–16 hours
- Edge cases & extended (TS015, TS016, TS021): Small (S) — 6–10 hours
- CI Integration & flakiness mitigation: Medium (M) — 8–16 hours
- Total engineering estimate (first-pass automation of high & medium priority): ~66–110 hours (approx 2–3 weeks for single engineer including CI, review, and security coordination)

25. Pass / Fail Criteria and Exit Criteria
-----------------------------------------
Pass Criteria:
- All Smoke tests pass.
- No critical security tests failing (SQLi / XSS).
- No critical regressions in core auth flows (valid login, logout).
- Non-functional thresholds met (median login time < 3s).
- Cookie flags set and HTTPS enforced.

Fail Criteria:
- Any smoke test fails.
- SQL Injection or XSS test causes an actual injection or script execution.
- Sessions not invalidated on logout.
- Protected pages accessible after logout.

Exit Criteria for CI run:
- Smoke suite must pass for pipeline to allow deployment.
- For nightly/regression runs, all high-priority and security tests must pass.
- Known intermittent test failures must have triage and flaky test ticket before merge.

26. Environment & Setup Steps
-----------------------------
Recommended Browsers & versions:
- Chromium (latest stable)
- Firefox (latest stable)
- WebKit (latest stable)
- Test runs on headless for CI; headed for debugging.

CI integration recommendations:
- GitHub Actions / Azure Pipelines / Jenkins — create separate jobs:
  - Quick smoke job (on PR) — runs smoke suite
  - Full regression job (nightly) — runs full suite including security and performance
  - Security job (scheduled, isolated) — runs SQLi/XSS in isolated environment

Secrets handling:
- Use CI secrets and vaults; never commit credentials.
- Use ephemeral test accounts and rotate credentials regularly.

Local setup:
- Node >= 18 (or project standard)
- Playwright installed with browsers: npx playwright install
- .env (gitignored) for local testing with ADMIN_EMAIL / ADMIN_PASSWORD

Test environment config:
- Provide a test instance that mirrors auth behavior and allows idling configuration (session timeout override).
- If DB-level verification required for security tests, provide an isolated DB snapshot with read-only verification endpoints.

27. Dependencies & Assumptions (re-stated)
-----------------------------------------
- Requirements file (source of truth) located at: C:\Users\Sumeet\OneDrive\Desktop\nopCommerce\requirements\authentication.md
- Admin demo target: https://admin-demo.nopcommerce.com/login?returnUrl=%2Fadmin%2F
- Test credentials present in test environment
- Dev team can add data-testids or accessible labels if missing
- Security tests executed only in an isolated, authorized environment

28. Deliverables
----------------
- This test plan: planning/authentication-test-plan.md (C:\Users\Sumeet\OneDrive\Desktop\nopCommerce\planning\authentication-test-plan.md)
- Suggested next-step deliverables for automation:
  - Seed spec files for smoke tests:
    - tests/authentication/001-login.spec.ts (TS001)
    - tests/authentication/004-validation.spec.ts (TS004/TS005/TS006)
    - tests/authentication/003-logout.spec.ts (TS013/TS014)
  - Security spec skeleton:
    - tests/authentication/003-security.spec.ts (TS010, TS011) — run only in isolated env
  - CI job definitions:
    - GH Actions workflows: smoke.yml (PR), regression.yml (nightly), security.yml (scheduled)
  - Test data and fixtures: test-data/authentication.json (use env var references)
  - Report templates and flakiness-tracking sheets

29. Recommended Next Steps for Automation Handoff
------------------------------------------------
1. Create stable environment and provision test admin accounts.
2. Ask development to add data-testids for critical controls:
   - data-testid="login-email"
   - data-testid="login-password"
   - data-testid="login-submit"
   (If not possible, confirm accessible labels to be used.)
3. Implement smoke seed tests (TS001, TS013, TS014) to validate CI gating.
4. Implement security tests behind a feature flag or run in separate isolated environment.
5. Integrate Playwright tests into CI pipeline with appropriate secrets and worker count.
6. Schedule nightly full regression including non-functional tests.
7. Maintain this plan under planning/ and create automation tickets for each TS.

30. Coverage Summary (REQ -> Test Scenario reference)
----------------------------------------------------
- REQ-001 (Valid login) -> TS001
- REQ-002 (Invalid password) -> TS002
- REQ-003 (Invalid/unregistered email) -> TS003
- REQ-004 (Mandatory fields) -> TS004, TS005, TS006
- REQ-005 (Email format & max length / Password max length) -> TS007, TS008, TS009
- REQ-006 (SQL Injection protection) -> TS010
- REQ-007 (XSS sanitization) -> TS011
- REQ-008 (Session expiration after idle) -> TS012
- REQ-009 (Logout invalidates session) -> TS013
- REQ-010 (Protected pages not accessible via Back after logout) -> TS014

Status: Ready for Automation

Notes & Remarks
---------------
- This plan intentionally avoids brittle, environment-specific selectors. The automation engineer should request stable data-testids or rely on accessible labels for resilience.
- Security tests should only be executed in environments where destructive payloads are safe; coordinate with the platform team before running injection payloads.
- The plan is ready to hand off to a Playwright automation engineer. It is expected that the automation engineer will create the spec files and fixtures and use environment variables for secrets.

End of test plan content.

JSON Handoff (for saving)
-------------------------
{
  "file_path": "C:\\Users\\Sumeet\\OneDrive\\Desktop\\nopCommerce\\planning\\authentication-test-plan.md",
  "file_name": "authentication-test-plan.md",
  "status": "ready_to_save"
}