import { Paper, Popover } from "@mui/material";

interface IPopupModal {
  open: boolean;
  handleClose: () => void;
  id?: string;
  title?: string;
  image?: string;
  anchorEl?: Element | ((element: Element) => Element) | null | undefined;
}

const PopupModal = ({
  open,
  handleClose,
  id,
  anchorEl,
  title,
  image,
}: IPopupModal) => {
  return (
    <>
      {open && image ? (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
          elevation={0}
          sx={(theme) => ({
            "& .MuiPaper-root": {
              backgroundColor: theme.palette.background.paper,
              height: "fit-content",
              overflow: "hidden",
              border: 0,
            },
          })}
        >
          <Paper
            component="img"
            role="img"
            src={image}
            alt={title ?? "image"}
            sx={(theme) => ({
              "&.MuiPaper-root": {
                width: 200,
                height: "100%",
                backgroundRepeat: "no-repeat",
                backgroundColor: theme.palette.common.white,
              },
            })}
          />
        </Popover>
      ) : null}
    </>
  );
};

export default PopupModal;
