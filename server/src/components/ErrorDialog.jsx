import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
} from "@fluentui/react-components";
import * as React from "react";

export const ErrorDialog = ({ open }) =>
{
  const [isOpen, setIsOpen] = React.useState(open);
  return (
    <Dialog open={isOpen}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Connection Error</DialogTitle>
          <DialogContent>
            Unable to establish connection with remote PC. A device is already connected or please check your network settings and ensure that the remote PC is turned on and accessible over the network.
          </DialogContent>
          <DialogActions>
            <Button appearance="secondary" onClick={()=>{setIsOpen(false)}}>OK</Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
