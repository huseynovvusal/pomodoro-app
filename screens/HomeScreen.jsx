import { View, Text, TouchableOpacity } from "react-native"
import React, { useEffect, useState } from "react"
import Icon from "react-native-vector-icons/Ionicons"
import CircularProgress from "react-native-circular-progress-indicator"
import { Audio } from "expo-av"
import { COLORS } from "../constants"

const editTime = (time) => {
  const seconds = (time % 60).toString()
  const minutes = parseInt(time / 60).toString()

  return `${minutes >= 10 ? minutes : "0" + minutes}:${
    seconds >= 10 ? seconds : "0" + seconds
  }`
}

const getPercent = (time, capacity) => {
  return parseInt((time / capacity) * 100)
}

const FOCUS = 10 * 60
const BREAK = 1 * 60
let TIME = FOCUS
const CURRENT_COLOR_THEME = COLORS.red

const HomeScreen = () => {
  const [timer, setTimer] = useState(false)
  const [time, setTime] = useState(TIME)

  const handleModeChange = (time) => {
    setTime(time)
  }

  const startTimer = () => {
    if (time == 0) {
      setTime(TIME)
    }

    setTimer(true)
  }

  const stopTimer = () => {
    setTimer(false)
  }

  const resetTimer = () => {
    stopTimer()
    setTime(TIME)
  }

  useEffect(() => {
    const check = async () => {
      if (timer) {
        if (time > 0) {
          setTimeout(() => {
            setTime(time - 1)
          }, 1000)
        } else {
          const { sound } = await Audio.Sound.createAsync(
            require("../assets/audios/alarm.mp3")
          )

          await sound.playAsync()
          setTimer(false)
        }
      }
    }

    check()
  })

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Header />
      <Body
        timer={timer}
        time={time}
        startTimer={startTimer}
        stopTimer={stopTimer}
        resetTimer={resetTimer}
      />
      <Footer timer={timer} handleModeChange={handleModeChange} />
    </View>
  )
}

const Footer = ({ timer, handleModeChange }) => {
  // 1 = Focus
  // 0 = Break

  const [mode, setMode] = useState(1)

  const handlePress = (m) => {
    if (!timer) {
      if (m == 1) {
        TIME = FOCUS
        handleModeChange(FOCUS)
      } else {
        TIME = BREAK
        handleModeChange(BREAK)
      }
      setMode(m)
    }
  }

  return (
    <View style={{ marginVertical: 30, flexDirection: "row" }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => handlePress(1)}
        style={{
          backgroundColor: mode ? CURRENT_COLOR_THEME : COLORS.white,
          paddingVertical: 10,
          paddingHorizontal: 20,
          overflow: "visible",
          borderRadius: 50,
          shadowColor: COLORS.gray,
          elevation: mode ? 0 : 1,
          marginHorizontal: 10,
        }}
      >
        <Text style={{ color: mode ? COLORS.white : COLORS.dark }}>Fokus</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={1}
        onPress={() => handlePress(0)}
        style={{
          backgroundColor: !mode ? CURRENT_COLOR_THEME : COLORS.white,
          paddingVertical: 10,
          paddingHorizontal: 20,
          overflow: "visible",
          borderRadius: 50,
          shadowColor: COLORS.gray,
          elevation: !mode ? 0 : 1,
          marginHorizontal: 10,
        }}
      >
        <Text style={{ color: !mode ? COLORS.white : COLORS.dark }}>
          Fasilə
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const Body = ({ timer, time, startTimer, stopTimer, resetTimer }) => (
  <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
      }}
    >
      <CircularProgress
        value={getPercent(time, TIME)}
        radius={110}
        activeStrokeColor={CURRENT_COLOR_THEME}
        activeStrokeWidth={3}
        inActiveStrokeWidth={10}
        inActiveStrokeColor={COLORS.divider}
        maxValue={100}
        showProgressValue={false}
      />

      <View
        style={{
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins_400Regular",
            color: COLORS.gray,
            fontSize: 40,
          }}
        >
          {editTime(time)}
        </Text>

        {timer ? (
          <TouchableOpacity onPress={() => stopTimer()}>
            <Text
              style={{
                color: COLORS.lightGray,
                fontSize: 18,
                fontFamily: "Poppins_400Regular",
              }}
            >
              Dayandır
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => startTimer()}
              style={{ marginHorizontal: 5 }}
            >
              <Text
                style={{
                  color: COLORS.lightGray,
                  fontSize: 18,
                  fontFamily: "Poppins_400Regular",
                }}
              >
                Başla
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => resetTimer()}
              style={{ marginHorizontal: 5 }}
            >
              <Text
                style={{
                  color: COLORS.lightGray,
                  fontSize: 18,
                  fontFamily: "Poppins_400Regular",
                }}
              >
                Sıfırla
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  </View>
)

const Header = () => (
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
    <Text
      style={{
        fontFamily: "Poppins_500Medium",
        fontSize: 20,
        color: CURRENT_COLOR_THEME,
      }}
    >
      POMODORO
    </Text>

    <TouchableOpacity activeOpacity={0.5}>
      <Icon
        name="settings-outline"
        size={25}
        style={{ color: CURRENT_COLOR_THEME }}
      />
    </TouchableOpacity>
  </View>
)

export default HomeScreen
