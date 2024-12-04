import { render } from "@testing-library/react";
import Overview from "./Overview";
import { act } from "react";
import { AlertProvider } from "../components/AlertProvider";

describe("<Overview /> spec", () => {
  it("renders the Overview", async () => {
    let view;
    await act(async () => {
      view = render(
        <AlertProvider>
          <Overview />
        </AlertProvider>,
      );
    });
    expect(view).toMatchSnapshot();
  });
});
