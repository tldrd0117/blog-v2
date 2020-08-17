import React, { Component, useState, Props, ChangeEvent } from "react"
import styles from "./signup.module.scss"
import classNames from 'classnames/bind'
import { observer, useObserver, useLocalStore } from 'mobx-react'
import { useStore } from "../../hooks";
import { SignupDto } from "../../models/AuthDto";
import { InputGroup, Button } from "@blueprintjs/core";
import LinkButton from "../../components/LinkButton"
import { useHistory } from "react-router-dom";
import InputPassword from "../../componentGroup/InputPassword";

const cx = classNames.bind(styles)

export default {}

