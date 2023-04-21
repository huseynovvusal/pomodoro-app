import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Dimensions,
  Pressable,
} from "react-native"
import React, { useEffect, useRef, useState } from "react"
import Icon from "react-native-vector-icons/Ionicons"
import { SafeAreaView } from "react-native-safe-area-context"
import { COLORS } from "../constants"
import { useNavigation } from "@react-navigation/native"
import { useSelector, useDispatch } from "react-redux"
import { update } from "../store/actions"

import i18next from "../i18next"

let CURRENT_COLOR_THEME = COLORS.dark
let FOCUS, BREAK

const SettingsScreen = () => {
  const data = useSelector((state) => state)
  const dispatch = useDispatch()

  const [_focus, setFocus] = useState("")
  const [_break, setBreak] = useState("")

  const navigation = useNavigation()

  CURRENT_COLOR_THEME = data.color
  FOCUS = data.focus / 60
  BREAK = data.break / 60

  const updateTimer = () => {
    if (_focus != "0" && _break != "0") {
      dispatch(
        update({
          focus: _focus.length ? parseInt(_focus) * 60 : FOCUS * 60,
          break: _break.length ? parseInt(_break) * 60 : BREAK * 60,
        })
      )
    }
    Keyboard.dismiss()

    setFocus("")
    setBreak("")
  }

  return (
    <SafeAreaView>
      <Header navigation={navigation} />
      <Body
        updateTimer={updateTimer}
        setFocus={(value) => setFocus(value)}
        setBreak={(value) => setBreak(value)}
        _break={_break}
        _focus={_focus}
      />
    </SafeAreaView>
  )
}

const Body = ({ updateTimer, setFocus, setBreak, _focus, _break }) => {
  const DISABLED = !(_focus.length || _break.length)

  return (
    <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
      <InputField
        name={i18next.t("focus")}
        placeholder={FOCUS}
        onChange={setFocus}
        value={_focus}
      />
      <InputField
        name={i18next.t("break")}
        placeholder={BREAK}
        onChange={setBreak}
        value={_break}
      />

      <Pressable
        disabled={DISABLED}
        onPress={() => updateTimer()}
        activeOpacity={0.9}
        style={{
          paddingHorizontal: 20,
          opacity: DISABLED ? 0.5 : 1,
          paddingVertical: 10,
          alignItems: "center",
          justifyContent: "center",
          overflow: "visible",
          borderRadius: 10,
          shadowColor: COLORS.gray,
          backgroundColor: CURRENT_COLOR_THEME,
          elevation: 10,
          marginVertical: 5,
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            color: COLORS.white,
            fontSize: 16,
          }}
        >
          {i18next.t("save")}
        </Text>
      </Pressable>

      <View>
        <Text
          style={{
            marginTop: 30,
            marginBottom: 20,
            fontSize: 20,
            color: COLORS.dark,
            fontFamily: "Poppins_500Medium",
            textAlign: "center",
          }}
        >
          {i18next.t("color_theme")}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
          }}
        >
          <Color color={COLORS.red} />
          <Color color={COLORS.green} />
          <Color color={COLORS.orange} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 10,
          }}
        >
          <Color color={COLORS.dark} />
          <Color color={COLORS.blue} />
          <Color color={COLORS.purple} />
        </View>
      </View>
    </View>
  )
}

const Color = ({ color }) => {
  const dispatch = useDispatch()

  return (
    <TouchableOpacity
      onPress={() => dispatch(update({ color: color }))}
      activeOpacity={1}
      style={{
        width: 70,
        height: 70,
        overflow: "visible",
        borderRadius: 10,
        shadowColor: COLORS.gray,
        backgroundColor: color,
        elevation: 2,
      }}
    />
  )
}

const InputField = ({ name, placeholder, onChange, value }) => (
  <View
    style={{
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      paddingHorizontal: 20,
      paddingVertical: 10,
      overflow: "visible",
      borderRadius: 10,
      shadowColor: COLORS.gray,
      backgroundColor: COLORS.white,
      elevation: 1,
      marginVertical: 5,
    }}
  >
    <Text
      style={{
        color: COLORS.gray,
        fontFamily: "Poppins_500Medium",
        fontSize: 18,
      }}
    >
      {name}
    </Text>
    <TextInput
      onSubmitEditing={Keyboard.dismiss}
      onChangeText={(value) => onChange(value)}
      placeholder={placeholder.toString()}
      value={value}
      keyboardType="numeric"
      maxLength={2}
      style={{
        borderWidth: 1,
        borderColor: COLORS.light,
        fontFamily: "Poppins_500Medium",
        fontSize: 18,
        borderRadius: 10,
        width: 70,
        paddingVertical: 5,
        paddingHorizontal: 10,
        color: COLORS.dark,
      }}
    />
  </View>
)

const Header = ({ navigation }) => (
  <View
    style={{
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderBottomColor: COLORS.divider,
      borderBottomWidth: 0.25,
    }}
  >
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        navigation.goBack()
      }}
    >
      <Icon
        name="chevron-back-outline"
        size={25}
        style={{ color: CURRENT_COLOR_THEME }}
      />
    </TouchableOpacity>

    <Text
      style={{
        fontFamily: "Poppins_500Medium",
        fontSize: 20,
        color: CURRENT_COLOR_THEME,
      }}
    >
      {i18next.t("settings")}
    </Text>

    {/* For Centering */}

    <Icon name="chevron-back-outline" size={25} style={{ opacity: 0 }} />
  </View>
)

export default SettingsScreen
