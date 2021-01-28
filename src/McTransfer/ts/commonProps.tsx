export interface ItemProps {
  key: string;
  disabled: boolean;
  [propName: string]: any;
}

export interface HeaderProps {
  text: string;
  dataIndex: string;
}

export interface StyleProps extends React.CSSProperties {
  width?: any;
  height?: any;
}
