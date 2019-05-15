import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';

function Dot({ active }) {
  return (
    <View
      style={{
        width: 6,
        height: 6,
        margin: 4,
        borderRadius: 3,
        backgroundColor: active ? '#000' : '#eee'
      }}
    />
  );
}

Dot.propTypes = {
  active: PropTypes.bool.isRequired
};

function Slideshow({
  animated,
  containerStyle,
  data,
  delay,
  dotsWrapperStyle,
  showDots,
  renderItem,
  renderDot
}) {
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
    const newPosition = data.length > position + 1 ? position + 1 : 0;
    const scrollrPosition = newPosition * windowWidth;

    timer = setTimeout(() => {
      scrollViewRef.current.scrollTo({ x: scrollrPosition, amimated: true });
      setPosition(newPosition);
    }, delay);
  }

  useEffect(() => {
    if (animated) handleTransitingSlide();
    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <View
      onLayout={setElementWidth}
      style={[
        {
          flex: 1,
          borderRadius: 10,
          marginBottom: 10
        },
        containerStyle
      ]}
    >
      <ScrollView
        onMomentumScrollEnd={handleHandScroll}
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {data.map((item, key) => (
          <View key={key} style={{ width: windowWidth }}>
            {renderItem(item)}
          </View>
        ))}
      </ScrollView>
      {showDots && (
        <View style={dotsWrapperStyle}>
          {data.map((dot, dotKey) => {
            if (typeof renderDot === 'function')
              return renderDot({ active: position === dotKey }, dotKey);
            return <Dot key={`dot-${dotKey}`} active={position === dotKey} />;
          })}
        </View>
      )}
    </View>
  );
}

Slideshow.defaultProps = {
  data: [],
  delay: 5000,
  containerStyle: {},
  animated: true,
  showDots: false,
  dotsWrapperStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  renderDot: undefined
};

Slideshow.propTypes = {
  animated: PropTypes.bool,
  containerStyle: PropTypes.shape({}),
  data: PropTypes.arrayOf(PropTypes.any.isRequired),
  delay: PropTypes.number,
  showDots: PropTypes.bool,
  dotsWrapperStyle: PropTypes.shape({}),

  renderItem: PropTypes.func.isRequired,
  renderDot: PropTypes.func
};

export default Slideshow;
