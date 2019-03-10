import React, { Component } from 'react'
import { Grid,} from 'semantic-ui-react'

export default class ErrorPage extends Component {
  render() {
    return (
      <div className='error-page-div'>
          {/*
            Heads up! The styles below are necessary for the correct render of this example.
            You can do same with CSS, the main idea is that all the elements up to the `Grid`
            below must have a height of 100%.
          */}
          <style>{`
            .error-page-div {
              display: table;
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 100%;
            }
          `}</style>

          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              You can't visit this page
            </Grid.Column>
          </Grid>
        </div>
    )
  }
}
