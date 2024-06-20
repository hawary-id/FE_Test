import React, { Component } from 'react'

type Props = {}

type State = {}

export default class Footer extends Component<Props, State> {
  state = {}

  render() {
    return (
        <div className="w-full bg-white py-2 px-5 flex justify-center text-sm font-light text-gray-700">
        Copyright 2024
      </div>
    )
  }
}