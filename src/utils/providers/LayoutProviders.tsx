import { AuthProvider } from "./AuthProvider";
import { ReactqueryProvider } from "./ReactqueryProvider";
import { ThemeProvider } from "./ThemeProvider";

const LayoutProviders = ({ children }: React.PropsWithChildren<object>) => {
  return (
    <ReactqueryProvider>
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
          enableSystem
        >
          {children}
        </ThemeProvider>
      </AuthProvider>
    </ReactqueryProvider>
  );
};

export { LayoutProviders };
