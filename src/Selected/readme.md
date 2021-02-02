`tsx

<FormItem
name='userName'
label={locale('sendObject.label')}
defaultValue={item.userName}
rules={[
{
required: true,
message: locale('required.select', {
text: locale('sendObject.label')
})
}
]}>
<SelectWithTable
triggerModalProps={{
                cancelText: locale('GLOBAL.CLOSE'),
                title: locale('select.object')
              }}
triggerELe={(value, method) => {
return <Button onClick={() => method()}>{value}</Button>;
}}
innerTableProps={{
                rowKey: 'userId',
                bordered:false,
                dataSource: items,
                pagination: {
                  ...page,
                  size: 'small',
                  showQuickJumper: true,
                  showSizeChanger: true,
                  pageSizeOptions: ['10', '20', '50', '100'],
                  showTotal: (total: number, range: number[]) => `共 ${total} 条`
                },
                columns: [
                  {
                    title: locale('userName.label'),
                    key: 'userName',
                    dataIndex: 'userName'
                  },
                  {
                    title: locale('realName.label'),
                    key: 'realName',
                    dataIndex: 'realName'
                  },
                  {
                    title: locale('userStatus.label'),
                    key: 'userStatus',
                    dataIndex: 'userStatus',
                    render: (text: any) => dicts('soc_AlarmAccountStatus', text)
                  }
                ]
              }}
/>
</FormItem>`
