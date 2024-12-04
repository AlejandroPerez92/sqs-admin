import { IconButton, Alert as MuiAlert } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { AlertProps } from "../types";

const Alert = (props: AlertProps) => {
  return (
      <MuiAlert
        severity={props.severity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={props.onClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{
          pointerEvents: 'auto',
          marginTop: '1em'
        }}
      >
        {props.message}
      </MuiAlert>
  );
};

export default Alert;
