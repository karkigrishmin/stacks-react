import { Component, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="mx-auto max-w-md space-y-6 p-8 text-center">
            <div className="bg-destructive/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
              <svg
                className="h-8 w-8 text-destructive"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight">Something went wrong</h1>
              <p className="text-muted-foreground">
                An unexpected error occurred. Please try again or reload the page.
              </p>
            </div>

            {this.state.error && (
              <div className="rounded-lg bg-muted p-4 text-left">
                <p className="break-all font-mono text-sm text-muted-foreground">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex justify-center gap-3">
              <Button variant="outline" onClick={this.handleRetry}>
                Try Again
              </Button>
              <Button onClick={this.handleReload}>Reload Page</Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
