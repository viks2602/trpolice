import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {GlobalCss} from '../../../style/MuiCss'
const LeadsTable = ({data}:any) => {
  const cols: GridColDef[] = [

   
    { field: "firstName", 
      headerName: "Contact Name",
      flex: 1,
      renderCell: (param) => {
        return (
          <Box>
         {param.row.firstName}&nbsp;{param.row.lastName}
          </Box>
        );
      }, },
      {
        field: "company",
        headerName: "company Name",
        flex: 1,
        renderCell: (param) => {
            return (
              <Box>
             {param.row.company.name}
              </Box>
            );
          },
    },
    {
      field: "jobTitle",
      headerName: "Job Title",
      flex: 1,
    },
 
    {
        field: "contactAccuracyScore",
        headerName: "Contact Accuracy Score",
        flex: 1,
    },

  ];

  return (
    <Box width={'55vw'}>
      <DataGrid
       getRowId={(row: any) => row.id + Math.random()}
        rows={data}
        columns={cols}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 15]}
        disableRowSelectionOnClick
        disableColumnMenu
        hideFooterSelectedRowCount
        sx={{
          ...GlobalCss.datagridTable
        }}
      />
    </Box>
  );
};

export default LeadsTable;

