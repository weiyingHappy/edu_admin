import { Select } from 'antd';
import React from 'react'
import { connect } from 'dva'
const Option = Select.Option;
class InputSelect extends React.PureComponent {
  handleFuncChange = (e) => {
    console.log(e, 11111111)
    this.setState({ funcs: e })
  }
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  handleBlur() {
    console.log('blur');
  }

  handleFocus() {
    console.log('focus');
  }
  handleSearch() {
    console.log('input change');
  }
  render() {
    return (
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onSearch={this.handleSearch}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
    )

  }
}
function mapStateToProps({ loading }) {
  return { loading }
}

export default connect(mapStateToProps)(InputSelect)
