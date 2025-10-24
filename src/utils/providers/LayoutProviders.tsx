import { Toaster } from "@/components/ui/sonner";
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
          {/* <SidebarProvider> */}
          {children}
          <Toaster position="top-center" />
          {/* </SidebarProvider> */}
        </ThemeProvider>
      </AuthProvider>
    </ReactqueryProvider>
  );
};

export { LayoutProviders };
