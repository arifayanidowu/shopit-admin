import { Box, Paper, SxProps, Theme, Typography } from "@mui/material";
import { useMemo } from "react";

interface IProps {
  getRootProps: any;
  getInputProps: any;
  isDragActive: boolean;
  image: string;
  src: string;
  containerStyle?: SxProps<Theme> | undefined;
}

const DropzoneContent = ({
  getRootProps,
  getInputProps,
  isDragActive,
  image,
  src,
  containerStyle,
}: IProps) => {
  const wrapperStyle = useMemo(
    () => ({
      cursor: "pointer",
      height: "100%",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1,
    }),
    []
  );
  return (
    <Paper square sx={containerStyle} {...getRootProps()} component="div">
      <input {...getInputProps()} />
      {isDragActive ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography variant="h6">Drop the files here ...</Typography>
        </Box>
      ) : (
        <Box
          sx={{
            ...wrapperStyle,
            zIndex: 1,
            "& img": {
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                opacity: 0.9,
              },
              borderStyle: isDragActive ? "dashed" : "solid",
            },
          }}
        >
          {image ? (
            <Paper
              component={"img"}
              src={src}
              alt="profile"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "center",
              }}
            />
          ) : (
            <Typography
              variant="h6"
              sx={{
                wordWrap: "break-word",
                textAlign: "center",
              }}
            >
              Drag 'n' drop some files here, or click to select files
            </Typography>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default DropzoneContent;
