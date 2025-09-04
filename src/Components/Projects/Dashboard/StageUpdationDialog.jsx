import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

export default function StageUpdationDialog(props) {
  const { handleClose, openDialog } = props;
  // const stages = ["APPLIED", "SHORTLISTED", "ACCEPTED", "REJECTED"];
  const stages = ['APPLIED', 'SHORTLISTED', 'ACCEPTED'];

  return (
    <Dialog onClose={handleClose} open={openDialog}>
      <DialogTitle> Update Application Status </DialogTitle>
      <List sx={{ pt: 0 }}>
        {stages.map((stage) => (
          <ListItem disableGutters key={stage}>
            <ListItemButton onClick={() => handleClose(stage)}>{stage}</ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
