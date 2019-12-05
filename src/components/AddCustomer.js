import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const AddCustomer = props => {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    phone: "",
    email: ""
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = event => {
    setCustomer({
      ...customer,
      [event.target.name]: event.target.value
    });
    console.log(customer);
  };

  const addCustomer = () => {
    props.saveCustomer(customer);
    handleClose();
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="white"
        onClick={handleClickOpen}
        style={{
          textDecoration: "none",
          color: "white",
          border: "1px solid white",
          padding: "5px",
          borderRadius: "15px"
        }}
      >
        Add Customer
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New customer</DialogTitle>
        <DialogContent>
          <DialogContentText>Fill Customer information here</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="firstname"
            value={customer.firstname}
            onChange={e => handleInputChange(e)}
            label="Firstname"
            //type="email"
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            name="lastname"
            value={customer.lastname}
            onChange={e => handleInputChange(e)}
            label="Lastname"
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            value={customer.streetaddress}
            onChange={e => handleInputChange(e)}
            name="streetaddress"
            label="Street Address"
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            value={customer.postcode}
            onChange={e => handleInputChange(e)}
            name="postcode"
            label="Postcode"
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            value={customer.city}
            onChange={e => handleInputChange(e)}
            name="city"
            label="City"
            fullWidth
          />
          <TextField
            margin="dense"
            value={customer.phone}
            onChange={e => handleInputChange(e)}
            id="name"
            name="phone"
            label="Phone Number"
            fullWidth
          />
          <TextField
            margin="dense"
            value={customer.email}
            onChange={e => handleInputChange(e)}
            id="name"
            name="email"
            label="Email Address"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addCustomer} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddCustomer;
