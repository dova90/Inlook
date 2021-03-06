import { Button } from "@material-ui/core";
import { User } from "oidc-client";
import React, { useEffect } from "react";
import { useHistory } from "react-router";

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SendIcon from '@material-ui/icons/Send';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      margin: "1em",
    },
    paper: {
      marginRight: theme.spacing(2),
    },
    button: {
      backgroundColor: "white",
      '&:hover': {
        backgroundColor: "#DAE0E2"
      }
    },
    icon: {
      marginLeft: "1em"
    },
    mitem: {
      display: "flex",
      justifyContent: "space-between"
    }
  }),
);

interface MenuButtonProps {
  user: User | null;
}

const MenuButton = (props: MenuButtonProps) => {
  const classes = useStyles();
  const [openMenu, setOpenMenu] = React.useState(false);
  const [roles, setRoles] = React.useState<string[]>([]);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const history = useHistory();
  const handleMenuButtonClick = () => {
    setOpenMenu((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    const roles = JSON.parse(localStorage.getItem('roles') || "[]");
    setRoles(roles || []);
  }, []);

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpenMenu(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenMenu(false);
    }
  }

  const prevOpen = React.useRef(openMenu);
  React.useEffect(() => {
    if (prevOpen.current === true && openMenu === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = openMenu;
  }, [openMenu]);

  return (
    <>
      {
        props.user ?
          <div className={classes.root}>
            <div>
              <Button
                className={classes.button}
                ref={anchorRef}
                aria-controls={openMenu ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleMenuButtonClick}
              >
                <MenuIcon
                ></MenuIcon>
              </Button>
              <Popper style={{ zIndex: 2137 }} open={openMenu} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={openMenu} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                          <MenuItem className={classes.mitem} onClick={(e) => { handleClose(e); history.push('/home'); }}>
                            <div>Home</div>
                            <HomeIcon className={classes.icon}></HomeIcon>
                          </MenuItem>
                          <MenuItem className={classes.mitem} onClick={(e) => { handleClose(e); history.push('/inbox'); }}>
                            <div>Inbox</div>
                            <MailOutlineIcon className={classes.icon}></MailOutlineIcon>
                          </MenuItem>
                          <MenuItem className={classes.mitem} onClick={(e) => { handleClose(e); history.push('/newmessage'); }}>
                            <div>New Mail</div>
                            <SendIcon className={classes.icon}></SendIcon>
                          </MenuItem>
                          <MenuItem className={classes.mitem} onClick={(e) => { handleClose(e); history.push('/contacts'); }}>
                            <div>Contacts</div>
                            <ContactMailIcon className={classes.icon} />
                          </MenuItem>
                          <MenuItem className={classes.mitem} onClick={(e) => { handleClose(e); history.push('/groups'); }}>
                            <div>Groups</div>
                            <GroupIcon className={classes.icon}></GroupIcon>
                          </MenuItem>
                          {roles.includes("Admin") &&
                            <MenuItem className={classes.mitem} onClick={(e) => { handleClose(e); history.push('/accounts'); }}>
                              <div>Accounts</div>
                              <SupervisorAccountIcon className={classes.icon} />
                            </MenuItem>

                          }
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          </div>


          : <></>
      }
    </>

  )
}

export default MenuButton;