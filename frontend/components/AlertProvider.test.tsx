import { render } from "@testing-library/react";
import { AlertProvider, useAlert } from "./AlertProvider";
import { useEffect, useState } from "react";

const TestComponent = () => {
  const { showAlert } = useAlert();
  const [hasAlertBeenShown, setHasAlertBeenShown] = useState(false);

  useEffect(() => {
    if (!hasAlertBeenShown) {
      showAlert("Test error", "error");
      showAlert("Test success", "success");
      setHasAlertBeenShown(true);
    }
  }, [hasAlertBeenShown, showAlert]);

  return <h1>Test</h1>;
};

describe("<AlertProvider /> spec", () => {
  it("renders the Alert and triggers showAlert", () => {
    const view = render(
      <AlertProvider>
        <TestComponent />
      </AlertProvider>
    );

    expect(view).toMatchSnapshot();
  });
});