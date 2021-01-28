export const downList = [
  {
    label: '应用程序名',
    value: [
      'IMP',
      'EXP',
      'DBLINK',
      'JOB',
      'PLSQLDEV',
      'SQL DEVELOPER',
      'TOAD',
      'SQLPLUS'
    ]
  },
  {
    label: '执行结果',
    value: ['成功', '失败']
  },
  {
    label: '时间域',
    value: ['周末', '工作日非工作时间', '工作日']
  },
  {
    label: '审计级别',
    value: ['高', '中', '低']
  },
  {
    label: '数据库类型',
    value: [
      'Oracle',
      'MySQL',
      'SQL Server',
      'DB2',
      'Sybase',
      'PostgreSQL',
      'Hive',
      'DaMeng',
      'KingBase',
      'Informix',
      'Mariadb',
      'GBase',
      'GBase 8s 8.3'
    ]
  }
];

export const conditionSelect = [
  {
    label: '资产名',
    value: '资产名',
    factorOperate: '=,<>,in,not in,like,not like,is null,is not null'
  },
  {
    label: '应用用户',
    value: '应用用户',
    factorOperate: '=,<>,in,not in,like,not like,is null,is not null'
  }
];
