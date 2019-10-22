console.log('demo13')

console.log('React: ', React)
console.log('ReactDOM: ', ReactDOM)

const throttle = (func, delay, duration) => {
    console.log(func, delay, duration)
    const self = this
    let timer = null
    let prevTime = new Date()
    return (...args) => {
      // const args = [].slice.call(arguments)
      const currentTime = new Date()
      console.log('触发', timer, currentTime - prevTime)
      if (currentTime - prevTime > duration) {
        console.log('间隔执行成功')
        // func.apply(self, args)
        func(...args)
        prevTime = currentTime
      } else {
        if (timer !== null) clearTimeout(timer) 
        timer = setTimeout(() => {
          console.log('延迟触发成功')
          // func.apply(self, args)
          func(...args)
        }, delay);
      }
    }
  }

class AutoComplete extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: ['beth', 'brandon', 'crazy', 'say', 'bbb'],
      selected: [],
      value: '',
      display: 'none',
    }
  }

  handleClick = (value) => {
    console.log('child: ', value)
    this.setState({
      selected: [],
      value,
      display: 'none',
    })
  }

  handleClickParent = (e) => {
    console.log('parent: ', e)
  }

  filterData = (value) => {
    console.log('value: ', value)
    const selected = this.state.data.filter(item => item.toLowerCase().indexOf(value.toLowerCase()) >= 0)
    this.setState({ selected })
  }

  debounce = (func, delay) => {
    let timer = null
    return (...rest) => {
      console.log('触发', timer)
      if (timer !== null) clearTimeout(timer) 
      timer = setTimeout(() => {
        console.log('延迟触发成功')
        func(...rest)
      }, delay);
    }
  }

  debounceFilterData = this.debounce(this.filterData, 1000)
  throttleFilterData = throttle(this.filterData, 500, 1000)

  handleChange = (e) => {
    this.setState({ value: e.target.value })

    this.debounceFilterData(e.target.value)
    // this.throttleFilterData(e.target.value)
  }

  inputOnBlur = (e) => {
    console.log('blur: ', e)
    // this.setState({ display: 'none' })
  }

  inputOnFocus = () => {
    console.log('focus')
    this.setState({ display: 'block' })
  }

  render() {
    return (<div className="auto-complate">
      <input
        type="text"
        value={this.state.value}
        onChange={this.handleChange}
        onBlur={this.inputOnBlur}
        onFocus={this.inputOnFocus}
      />

      <ul style={{ display: this.state.display }}>
        {
          this.state.data.map(item => (
            (
              (this.state.selected.length && this.state.selected.includes(item)) ||
              !this.state.selected.length
            ) && <li
              key={item.toString()}
              onClick={() => (this.handleClick(item))}
            >{item}</li>
          ))
        }
      </ul>
    </div>)
  }
}

ReactDOM.render(<AutoComplete />, document.getElementById('root'))