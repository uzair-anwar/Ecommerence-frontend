import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddIcon from "@mui/icons-material/Add";
import PercentIcon from "@mui/icons-material/Percent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SideBar() {
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [stickyClass, setStickyClass] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => window.removeEventListener("scroll", stickNavbar);
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      // window height changed for the demo
      windowHeight > 150 ? setStickyClass("sticky-nav") : setStickyClass("");
    }
  };

  const handleAccount = () => {
    navigate("/profile/infomation");
  };

  const handleProduct = () => {
    navigate("/profile/products");
  };

  const handleAddProduct = () => {
    navigate("/profile/addProduct");
  };

  const handleOrder = () => {
    navigate("/profile/orders");
  };

  return (
    <Box className={`side-bar  ${stickyClass}`}>
      <List className="">
        <ListItem disablePadding onClick={handleAccount}>
          <ListItemButton>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={handleProduct}>
          <ListItemButton>
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={handleAddProduct}>
          <ListItemButton>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Product" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={handleOrder}>
          <ListItemButton>
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
