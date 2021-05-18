import Alert from "@material-ui/lab/Alert";

interface ViewErrorInfoPropsInterface {
  hasError: boolean;
  errorMessage: string;
}

export const ViewErrorInfo: React.FunctionComponent<ViewErrorInfoPropsInterface> =
  (props) => {
    return (
      <div>
        {props.hasError && (
          <div>
            {" "}
            <Alert severity="error">{props.errorMessage}</Alert>{" "}
          </div>
        )}
      </div>
    );
  };
