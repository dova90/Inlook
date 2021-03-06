import { List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ReplyIcon from '@material-ui/icons/Reply';
import React, { useEffect, useState } from 'react';
import { EmailProps } from '../../Api/mailApi';
import * as attachmentsApi from "../../Api/attachmentsApi";
import { useSnackbar } from 'notistack';

export interface EmailContentProps {
    email: EmailProps;
}

const useStyles = makeStyles(theme => ({
    subjectClass: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: '1.5rem',
        marginLeft: '1em',
        marginBottom: '0.2em'
    },
    bodyStyle: {
        display: 'flex',
        justifyContent: 'flexstart',
        flexDirection: "column"
    },
    oneLiner: {
        minHeight: '1em',
        marginTop: '0.5em'
    },
    textMail: {
        minHeight: '85%',
        marginTop: '2em',
        overflowY: 'scroll'
    },
    buttonClass: {
        border: 'solid',
        borderWidth: '0.2em',
        borderColor: 'lightgrey',
        marginLeft: '0.5em',
        marginTop: '0.5em',
    },
    attachments:
    {
        marginTop: '0.5em'
    }


}));


const EmailContent = (props: EmailContentProps) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [to, setTo] = useState<string>('');
    const [cc, setCC] = useState<string>('');
    const [error, setError] = useState<string>();
    const [subject, setSubject] = useState<string>('no subject');
    const classes = useStyles();
    useEffect(() => {
        setTo(props.email.to.map(x => x.email).join("; "));
        setCC(props.email.cc.map(x => x.email).join("; "));
        if (props.email.subject)
            setSubject(props.email.subject);
        else
            setSubject('(no subject)');
    }, [props.email]);
    props.email.to.map(x => x.email);

    const downloadAttachment = (id: string, fileName: string) => {
        attachmentsApi.getFile(id, fileName).catch(err => {
            enqueueSnackbar("Attachment is inaccesable", { variant: "error" });
        })
    }

    return (
        <div>
            <header className={classes.subjectClass}>
                {subject}
            </header>
            <div className={classes.bodyStyle}>
                <div className={classes.oneLiner}>From: {props.email.from.email}</div>
                <div className={classes.oneLiner}>To: {to}</div>
                <div className={classes.oneLiner}>CC: {cc}</div>

                <div className={classes.textMail}>
                    {props.email.text}
                </div>
                <div className={classes.attachments}>

                    <List dense>
                        {props.email.attachments.map(att =>
                            <ListItem
                                button
                                onClick={() => downloadAttachment(att.id, att.clientFileName)}
                            >
                                <ListItemText
                                    primary={att.clientFileName}
                                />
                            </ListItem>)
                        }
                    </List>
                </div>
            </div>

        </div>
    )

}

export default EmailContent;