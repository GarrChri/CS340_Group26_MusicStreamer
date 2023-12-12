/* App.test.js

Citation Information
This file was provided with the create-react-app starter code. No changes
have been made. Code was obtained from: https://react.dev
Date: 10/28/2023
*/

import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
