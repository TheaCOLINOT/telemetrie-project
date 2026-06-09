import * as Sentry from "@sentry/react";

function TestGlitchTip() {
  return (
    <button
      onClick={() => {
        Sentry.captureException(
          new Error("Test GlitchTip depuis React")
        );
      }}
    >
      Tester GlitchTip
    </button>
  );
}

export default TestGlitchTip;