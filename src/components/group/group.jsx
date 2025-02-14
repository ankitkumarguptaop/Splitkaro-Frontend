import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import Input from "../input/input";
import { FixedSizeList } from "react-window";
import React, { use, useEffect, useState } from "react";
import style from "./group.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createGroup, listGroup } from "../../features/group/group.action";
import {
  setCurrentSeletedGroup,
  setGroupModal,
} from "../../features/group/group.slice";

const Group = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.group.groups);
  const isOpenModal = useSelector((state) => state.group.isOpenModal);
  const currentUser = useSelector((state) => state.auth.currentUser);



  const [input, setInput] = useState({
    groupName: "",
    description: "",
  });

  const [error, setError] = useState({
    groupNameError: "",
    descriptionError: "",
  });

  const [isEditState, setIsEditState] = useState(false);

  function handleInput(e, currentInput, currentInputError) {
    setInput({
      ...input,
      [currentInput]: e.target.value,
    });

    if (e.target.value.replace(/\s+/g, " ").trim().length <= 0) {
      setError({
        ...error,
        [currentInputError]: true,
      });
    } else {
      setError({
        ...error,
        [currentInputError]: false,
      });
    }
    if (e.target.value.length <= 0) {
      setError({
        ...error,
        [currentInputError]: false,
      });
    }
  }

  const modalStyle = {
    top: "50%",
    left: "65%",
    transform: "translate(-50%, -50%)",
    width: "26vw",
    minWidth: "330px",
    height: "310px",
    maxHeight: "auto",
    bgcolor: "rgb(255, 255, 255)",
    color: "black",
    p: 6,
    borderRadius: "10px",
  };

  function handleCreateGroup() {
    try {
      dispatch(
        createGroup({
          name: input.groupName,
          description: input.description,
          user_id: currentUser.user._id,
        })
      );
      dispatch(setGroupModal(false));
    } catch (error) {
      console.log(error);
    }
  }

  function handleCloseModal() {
    setInput({
      groupName: "",
      description: "",
    });
    setError({
      groupNameError: false,
      descriptionError: false,
    });
    dispatch(setGroupModal(false));

    setIsEditState(false);
  }


  useEffect(() => {
    dispatch(listGroup({ user_id: currentUser.user._id }));
  }, [currentUser]);

  function renderRow(props) {
    const { index, style } = props;
    return (
      <>
        {groups &&
          groups.map((group) => (
            <List
              onClick={() => dispatch(setCurrentSeletedGroup(group))}
              className={style["group-list"]}
              sx={{
                width: "100%",
                bgcolor: "background.paper",
                height: "110px",
                cursor: "pointer",
              }}
              key={group.group_id._id}
            >
              <>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Cindy Baker" src="" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={group.group_id.name}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{ color: "text.primary", display: "inline" }}
                        >
                          {"description : "}
                        </Typography>
                        {group.group_id.description}
                      </>
                    }
                  />
                </ListItem>
                <Divider component="li" variant="inset" />
              </>
            </List>
          ))}
      </>
    );
  }

  return (
    <>
      <FormControl className="form" sx={{ borderRadius: "10px" }}>
        <Modal sx={modalStyle} open={isOpenModal} onClose={handleCloseModal}>
          <Box className="add-functionality" sx={{ borderRadius: "10px" }}>
            <Box className="add-text">Create Group</Box>
            <Box className={style.name}>
              <Input
                lable="Group Name"
                height={"40px"}
                width={"95%"}
                value={input.groupName}
                error={error.groupNameError}
                setState={(e) => handleInput(e, "groupName", "groupNameError")}
              ></Input>
              {error.groupNameError && (
                <Box
                  style={{
                    color: "red",
                    marginBottom: "10px",
                  }}
                >
                  Enter correct group name
                </Box>
              )}
            </Box>
            <Box className={style.description}>
              <Input
                lable="Description"
                height={"40px"}
                width={"95%"}
                value={input.description}
                error={error.descriptionError}
                setState={(e) =>
                  handleInput(e, "description", "descriptionError")
                }
              ></Input>
              {error.descriptionError && (
                <Box
                  style={{
                    color: "red",
                    marginBottom: "10px",
                  }}
                >
                  Enter correct description
                </Box>
              )}
            </Box>

            <Box className="Add-edit-close-button">
              <Button
                disableRipple
                disableElevation
                className="add-contacts"
                onClick={handleCreateGroup}
                variant="contained"
              >
                {isEditState ? "Edit" : "Create"}
              </Button>
              <Button
                disableRipple
                disableElevation
                className="close-modal"
                onClick={handleCloseModal}
                variant="contained"
              >
                {"Close"}
              </Button>
            </Box>
          </Box>
        </Modal>
      </FormControl>
      <Box className={style["group-container"]}>
        <Box
          sx={{
            padding: "10px",
            width: "100%",
            height: "100%",
            maxWidth: "100%",
            bgcolor: "background.paper",
            borderRadius: "10px",
            backgroundColor: "rgb(225, 222, 222)",
          }}
        >
          <FixedSizeList
            height={580}
            width={"100%"}
            itemSize={80}
            itemCount={1}
            overscanCount={5}
          >
            {renderRow}
          </FixedSizeList>
        </Box>
      </Box>
    </>
  );
};

export default Group;
