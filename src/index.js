import { message } from 'antd'
import dva from 'dva';
import createLoading from 'dva-loading'
import './index.css';

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  onError (error) {
    message.error(error.message)
  },
})

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/app').default);
app.model(require('./models/common').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
