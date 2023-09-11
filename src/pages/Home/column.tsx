export const columns = [
  {
    accessorKey: "name",
    header: "name",
    cell: (info: any) => <>{info.getValue()}</>,
  },
  {
    accessorKey: "native",
    header: "native",
    cell: (info: any) => <>{info.getValue()}</>,
  },
  {
    accessorKey: "capital",
    header: "capital",
    cell: (info: any) => <>{info.getValue()}</>,
  },
  {
    accessorKey: "emoji",
    header: "emoji",
    cell: (info: any) => <>{info.getValue()}</>,
  },
  {
    accessorKey: "currency",
    header: "currency",
    cell: (info: any) => <>{info.getValue()}</>,
  },
  {
    accessorKey: "languages",
    header: "Languages",
    cell: (info: any) => (
      <>
        {info.row.original.languages.map((language: any) => (
          <p key={language.code}>{language.name} </p>
        ))}
      </>
    ),
  },
];
