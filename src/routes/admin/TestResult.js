import React from 'react'
import { connect } from 'dva'
import { message, Progress, Table, Icon } from 'antd'
import { renderList } from '../../utils/tool'
import style from './index.less'

const hldConfig = {
  Artistic: {
    name: '艺术型（A）',
    name_en: 'Artistic',
    intro: '艺术型职业要求富有创造力，渴望表现自己的个性，具有一定的艺术才能和个性。善于表达、能够在没有太多规则与框架的环境中工作。'
  },
  Conventional: {
    name: '常规型（C）',
    name_en: 'Conventional',
    intro: '常规型的职业经常需要遵循既定的程序和惯例。这些职业包括处理数据和执行细节，而不只是想法。通常会有明确的权限约束需要遵循。'
  },
  Enterprising: {
    name: '企业型（E）',
    name_en: 'Enterprising',
    intro: '企业型职业要求自主开始一个完整的项目，常常需要带领别人，具有领导才能。喜欢竞争、敢冒风险、有野心、抱负。为人务实，以结果为衡量标准。'
  },
  Investigative: {
    name: '调研型（I）',
    name_en: 'Investigative',
    intro: '调研性工作要求抽象思维能力强，求知欲强，肯动脑，善思考，能够独立完成任务，并且善于创造。'
  },
  Realistic: {
    name: '实际型（R）',
    name_en: 'Realistic',
    intro: '现实型职业经常涉及实际的问题的解决。经常处理植物、动物和材料，如木材、工具和机械。大多要求在外面工作，不需要大量文书工作与合作。'
  },
  Social: {
    name: '社会型（S）',
    name_en: 'Social',
    intro: '社会型职业要求喜欢与人交往、善言谈、愿意教导别人。关心社会问题、渴望发挥自己的社会作用，比较看重社会义务和社会道德'
  }
}

// const messages = defineMessages({
//     pr_result: {
//       id: 'pr_result',
//       defaultMessage: '测评结果'
//     },
//     pr_class: {
//       id: 'pr_class',
//       defaultMessage: '职业分类'
//     },
//     pr_standard: {
//       id: 'pr_standard',
//       defaultMessage: '高度匹配职业标准'
//     },
//     outstanding_hld: {
//       id: 'outstanding_hld',
//       defaultMessage: '你突出的霍兰德代码'
//     },
//     other_hld: {
//       id: 'other_hld',
//       defaultMessage: '你其余的霍兰德代码'
//     },
//     pr_recommend: {
//       id: 'pr_recommend',
//       defaultMessage: '相关职业推荐'
//     },
//   });

class TestResult extends React.Component {
  state = {
    results: null,
    HLD: []
  }
  componentWillMount() {
    const { dispatch, location } = this.props
    const { pathname } = location
    console.log('555', pathname)
    const parm = pathname.split('/')
    const uri = `ReportManage/${parm[2]}/${parm[3]}`
    dispatch({
      type: 'app/request',
      uri: uri,
      callback: ({ results }) => {
        let HLD = [
          { type: 'Artistic', point: results.answer.Artistic },
          { type: 'Conventional', point: results.answer.Conventional },
          { type: 'Enterprising', point: results.answer.Enterprising },
          { type: 'Investigative', point: results.answer.Investigative },
          { type: 'Realistic', point: results.answer.Realistic },
          { type: 'Social', point: results.answer.Social }
        ]
        HLD.sort((a, b) => a.point - b.point)
        this.setState({
          results: results,
          HLD: HLD
        })
      }
    })
  }
  switchAns(id, ans) {
    let { dispatch, test } = this.props
    test.answer[id] = ans
    dispatch({
      type: 'test/success',
      payload: { answer: test.answer }
    })
  }

  nextPage() {
    let { dispatch, test } = this.props
    let { answer, nowPage } = test
    let f = true, ans = []
    for (let i in answer) {
      ans.push({ title_id: i, result: answer[i] })
      if (answer[i] == '') {
        f = false
        break;
      }
    }
    if (f) {
      dispatch({
        type: 'test/answer',
        payload: { answer: ans },
        page: nowPage
      })
    } else {
      message.warning({
        message: '答案不完整',
        description: '您可能在本页有问题没有回答，请补答！'
      })
    }
  }
  render() {
    const { app, loading, dispatch } = this.props
    const { results, HLD } = this.state
    const result = results ? results.result : []
    const lists = result
    console.log('list', lists)
    return (
      <div className={style.report}>
        <div className={style.case}>
          <h1 className={style.title}>
            <span>测评结果</span>
          </h1>
          <p className={style.text}>基于霍兰德职业编号，测评得出您在六个维度的得分（S,E,R,I,C,A)，同时我们通过20年积累的问卷大数据库算法与数据库中1000多个职业进行匹配，得出与您的职业兴趣最相关的职业列表，职业列表标注出了与STEM技能高度相关的职业。</p>
        </div>
        <div className={style.case}>
          <h1 className={style.title}>
            <span>职业分类</span>
          </h1>
          <p className={style.text}>我们根据通常不同职业的教育程度需求，将职业类别分为5个种类</p>
          <div className={style.pr_class}>
            {
              renderList([
                { point: 1, text: '没有教育程度门槛' },
                { point: 2, text: '需要一定职业技能培训' },
                { point: 3, text: '高中学位' },
                { point: 4, text: '本科学位要求' },
                { point: 5, text: '硕士学位要求' },
              ], (i, k) => (
                <div className={style.class_item} key={k}>
                  <span className={style.point}>{i.point}</span>
                  <span className={style.text}>{i.text}</span>
                </div>
              ))
            }
          </div>
        </div>
        <div className={style.case}>
          <h1 className={style.title}>
            <span>高度匹配职业标准:</span>
          </h1>
          <p className={style.text}>基于您的测评答案，相关系数在0.7以上的，我们称之为高度匹配职业，每个职业分类（1-5）的群组中，我们会确保有3-5个推荐职业，因此您会看到与您高度匹配的25-15个职业。</p>
        </div>
        <div className={style.case}>
          <h1 className={style.c_title}>
            <span>你突出的霍兰德代码</span>
          </h1>
          <div className={style.code}>
            {
               renderList(HLD.slice(3, 6), (i, k) => (
                <div className={style.codeItem} key={k}>
                  <Progress
                    type="circle"
                    percent={Math.round(i.point / 40 * 100)}
                    width={70}
                    style={{ display: 'block', marginBottom: '5pt' }}
                    format={percent => i.point}
                  />
                  {hldConfig[i.type].name}
                </div>
              ))
            }
          </div>
          <div className={style.intros}>
            {
              renderList(HLD.slice(3, 6), (i, k) => (
                <div className={style.intr} key={k}>
                  <span className={style.intrT}>{hldConfig[i.type].name}</span>
                  <p className={style.intrC}>{hldConfig[i.type].intro}</p>
                </div>
              ))
            }
          </div>
        </div>
        <div className={style.case}>
          <h1 className={style.o_title}>
            <span >你其余的霍兰德代码</span>
          </h1>
          <div className={style.code}>
            {
              renderList(HLD.slice(0, 3), (i, k) => (
                <div className={style.codeItem} key={k}>
                  <Progress
                    type="circle"
                    percent={Math.round(i.point / 40 * 100)}
                    width={70}
                    style={{ display: 'block', marginBottom: '5pt' }}
                    format={percent => i.point}
                  />
                  {hldConfig[i.type].name}
                </div>
              ))
            }
          </div>
          <div className={style.intros}>
            {
              renderList(HLD.slice(0, 3), (i, k) => (
                <div className={style.intr} key={k}>
                  <span className={style.intrT}>{hldConfig[i.type].name}</span>
                  <p className={style.intrC}>{hldConfig[i.type].intro}</p>
                </div>
              ))
            }
          </div>
        </div>
        <div className={style.case}>
          <h1 className={style.b_title}>
            <span >相关职业推荐</span>
          </h1>
          <Table
            style={{ marginTop: '15pt' }}
            columns={[
              {
                title: '职业',
                dataIndex: 'name',
                width: '160pt',
                render: (text, record, index) => {
                  if (index % 2) {
                    return <span style={{ color: '#F4A84C' }}>{text}</span>
                  } else {
                    return <span style={{ color: '#1D6FD4' }}>{text}</span>
                  }
                }
              },
              {
                title: 'STEM',
                dataIndex: 'stem',
                render: (text) => text == 1 ? <Icon type="check" /> : '',
                className: `${style.tdC}`
              },
              {
                title: '教育水平等级',
                dataIndex: 'edu_level',
                className: `${style.tdC}`
              },
              {
                title: '所属行业',
                dataIndex: 'industry_id',
                // render: (text) => listIndustry[text],
                width: '70pt'
              },
              {
                title: '分数',
                dataIndex: 'corrcoef',
                render: (text) => (text / 100).toFixed(2)
              }
            ]}
            dataSource={lists || []}
            rowkey={_ => _.id}
            rowClassName={(a, k) => {
              if (k % 2) {
                return `${style.srow}`
              } else {
                return `${style.trow}`
              }
            }}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps({ loading, app }) {
  return { loading, app }
}

export default connect(mapStateToProps)(TestResult)
