import { FunctionComponent, ReactNode, useState } from "react";
import { Modal as DefaultModal, View, Text, StyleSheet } from "react-native";
import { PressableText } from "./PressableText";

interface IModalProps {
  activator?: FunctionComponent<{ handleOpen: () => void }>;
  children: ReactNode;
}

export function Modal({ activator: Activator, children }: IModalProps) {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <>
      <DefaultModal visible={isModalVisible} animationType="slide">
        <View style={styles.centerView}>
          {children}
          <PressableText onPress={() => setModalVisible(false)} text="Close" />
        </View>
      </DefaultModal>

      {Activator ? (
        <Activator handleOpen={() => setModalVisible(true)} />
      ) : (
        <PressableText onPress={() => setModalVisible(true)} text="Open" />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
