import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button, List, ListItem, ListItemText } from '@material-ui/core';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { getGroups, GroupModel } from "../Api/groupsApi";
import { User } from "oidc-client";
import { useHistory } from "react-router";
import { useSnackbar } from "notistack";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "80%",
        margin: "1em auto auto auto"
    },
    listClass: {
        margin: "1em",
        background: "#99AAAB",
        color: "white"
    },
    listHeader: {
        color: "white"
    }
});

interface GroupsProps {
    user: User | null;
}
const Groups = (props: GroupsProps) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [groups, setGroups] = useState<GroupModel[]>([]);

    const classes = useStyles();
    const history = useHistory();
    useEffect(() => {
        getGroups().then(result => {
            if (result.isError) {
                enqueueSnackbar("Could not load groups", { variant: "error" });
            }
            else {
                setGroups(result.data || []);
            }
        })
    }, [props.user]);

    const ListItemFunction = (x: GroupModel) => {
        return (
            <ListItem button onClick={
                (e) => history.push({
                    pathname: '/groupinfo',
                    state: { user: props.user, group: x }
                })}
                key={x.id}
            >
                <ListItemText primary={x.name} />
            </ListItem>);
    }
    return (
        <div className={classes.root}>
            <>
                <Button variant="contained" id="create_gorup_button" color="primary" endIcon={<GroupAddIcon />}
                    onClick={() => history.push('/creategroup')}
                >Create group</Button>
                <div>
                    <h3> Groups list</h3>
                    {groups.length === 0 ? <h3> No groups</h3>
                        :
                        <List className={classes.listClass}>
                            {groups.map(ListItemFunction)}
                        </List>
                    }
                </div>
            </>
        </div>
    );
};

export default Groups;