// Hooks로 전환함

import React, {PureComponent, memo} from 'react';


const Try = memo(({ tryInfo }) => {

  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  )
});

// class Try extends PureComponent {
//   constructor(props) {
//     super(props);
//
//     const filtered = this.props.filter(() => {
//
//     })
//     this.state = {
//       result: filtered,
//       try: this.props.try,
//     }
//   }
// }


// class Try extends PureComponent {
//   render() {
//     const { tryInfo } = this.props;
//     return (
//       <li>
//         <div>{tryInfo.try}</div>
//         <div>{tryInfo.result}</div>
//       </li>
//     )
//   }
// }



export default Try;
