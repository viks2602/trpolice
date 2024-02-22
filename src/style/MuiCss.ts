export const GlobalCss = {
    datagridTable:{
        "& .MuiBox-root": {
            width: "100%",
          },
          "& .MuiDataGrid-row.Mui-selected, & .MuiDataGrid-row.Mui-selected.Mui-hovered, & .MuiDataGrid-row.Mui-hovered":
            {
              background: "transparent",
            },
  
          "& .MuiDataGrid-row .MuiDataGrid-cell:nth-child()": {
            color: "#248dc1",
          },
          "& .MuiDataGrid-main .MuiDataGrid-virtualScroller .MuiDataGrid-row:nth-child(odd)":
            {
              background: "#f2f2f2",
            },
          "& .MuiDataGrid-withBorderColor": {
            borderColor: "none",
          },
  
          "& .MuiDataGrid-cell": {
            padding: "4px 10px",
            fontFamily: "Chivo",
          },
          "& .MuiTablePagination-root .MuiToolbar-root p": {
            margin: 0,
          },
  
          border: 0,
          ".MuiDataGrid-columnHeaders": {
            border: 0,
            color: "#248DC1",
          },
          ".MuiDataGrid-row": {
            borderBottom: "none",
          },
          ".MuiDataGrid-virtualScroller": {
            border: 0,
          },
    }
}