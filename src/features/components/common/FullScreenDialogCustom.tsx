/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement, Ref, forwardRef } from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import bgImage from '../../../common/images/candel.jpg';

interface FullScreenDialogProps {
  title: string;
  children: ReactElement;
  mainLayout: ReactElement;
  open: boolean;
  setOpen: (a: boolean) => void;
  handleClick: () => void;
}

const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: ReactElement;
    },
    ref: Ref<unknown>,
  ) => <Slide direction="up" ref={ref} {...props} />,
);

export default function FullScreenDialogCustom({
  children,
  title,
  mainLayout,
  open,
  setOpen,
  handleClick,
}: FullScreenDialogProps) {
  const handleClickOpen = () => {
    handleClick();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={() => {}}
        onClick={handleClickOpen}
      >
        {children}
      </div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', background: 'green' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1 }}
              variant="h6"
              component="div"
            >
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <div
          style={{
            width: '100vw',
            position: 'fixed',
            backgroundImage: `url(${bgImage})`,
            height: '100vh',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '100vw',
              overflow: 'scroll',
              height: '100%',
            }}
          >
            {mainLayout}
          </div>
        </div>
      </Dialog>
    </div>
  );
}
