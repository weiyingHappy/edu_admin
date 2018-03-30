/** 项目中一些自定义的控件 */
import FAButton from './ActionButton/FAButton'
import SAButton from './ActionButton/SAButton'
import ExportButton from './ActionButton/ExportButton'

import DataTable from './DataTable/DataTable'
import SelfDataTable from './DataTable/SelfDataTable'
import SelectDataTable from './DataTable/SelectDataTable'

import EditableInput from './Editables/EditableInput'
import EditableImage from './Editables/EditableImage'
import EditableSelect from './Editables/EditableSelect'

import Loader from './Loader/Loader'

import SearchInput from './Search/SearchInput'
import SearchBar from './Search/SearchBar'
import SearchSelect from './Search/SearchSelect'
import SearchDateRange from './Search/SearchDateRange'

import MultiUpFile from './Upload/MultiUpFile'

import AuthButtonAdd from './Auth/AuthButtonAdd'

export {
  FAButton, // 表单提交按钮，包含确认和取消
  SAButton, // 搜索提交按钮，包含确认和取消
  ExportButton, // 导出按钮

  DataTable, // 数据列表显示，自动分页和显示
  SelfDataTable, // 指定一个接口地址，实现自我请求的表格控件
  SelectDataTable, //可以选择表格里某项的控件

  EditableInput, // 可编辑的输入框
  EditableImage, // 可编辑图片列表
  EditableSelect, // 可编辑下拉框

  Loader, // 加载动画

  SearchBar, // 带搜索按钮的搜索框，一般单独使用
  SearchInput, // 搜索输入框，一般和其他搜索组件结合使用
  SearchSelect, // 下拉搜索框
  SearchDateRange, //日期搜索

  MultiUpFile, // 图片上传

  AuthButtonAdd, //授权添加按钮
}
