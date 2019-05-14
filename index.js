import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';

function Slideshow({ data, delay, containerStyle, renderItem }) {
  const [position, setPosition] = useState(0);
  const scrollViewRef = useRef();
  const [windowWidth, setWindowWidth] = useState(0);
  let timer;

  function setElementWidth(element) {
    setWindowWidth(element.nativeEvent.layout.width);
  }

  function handleHandScroll({ nativeEvent: { contentOffset } }) {
    clearTimeout(timer);

    const newPosition = Math.round(contentOffset.x / windowWidth);
    const scrollrPosition = newPosition * windowWidth;
    scrollViewRef.current.scrollTo({ x: scrollrPosition, amimated: true });
    setPosition(newPosition);
  }

  function handleTransitingSlide() {
    const newPosition = position + 1;
    const scrollrPosition = newPosition * windowWidth;

    timer = setTimeout(() => {
      scrollViewRef.current.scrollTo({ x: scrollrPosition, amimated: true });
      if (position < data.length) setPosition(newPosition);
      else setPosition(0);
    }, delay);
  }

  useEffect(() => {
    handleTransitingSlide();
    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <View
      onLayout={setElementWidth}
      style={[
        containerStyle,
        {
          flex: 1,
          overflow: 'hidden',
          borderRadius: 10,
          marginBottom: 10,
        },
      ]}
    >
      <ScrollView
        onMomentumScrollEnd={handleHandScroll}
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {data.map((item, key) => (
          <View style={{ width: windowWidth }}>{renderItem(item, key)}</View>
        ))}
      </ScrollView>
    </View>
  );
}

Slideshow.defaultProps = {
  data: [],
  delay: 5000,
  containerStyle: {},
};

Slideshow.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any.isRequired),
  delay: PropTypes.number,
  containerStyle: PropTypes.shape({}),

  renderItem: PropTypes.func.isRequired,
};

export default Slideshow;
