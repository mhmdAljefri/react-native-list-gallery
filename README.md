# React Native List Gallery &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mhmdAljefri/react-native-list-gallery/blob/master/LICENSE.md) [![npm version](https://img.shields.io/badge/npm-v1.0.0-blue.svg)](https://www.npmjs.com/package/react-native-list-gallery)

## Props

| Name           | Type     | default    | Description                                         |
| -------------- | -------- | ---------- | --------------------------------------------------- |
| animated       | bool     | true       | Allow automatic gallery swaping                     |
| containerStyle | object   | {}         | styling the main continer                           |
| data           | array    | default    | Description                                         |
| delay          | intger   | 5000       | animating slid delay in milisconds if animated true |
| renderItem     | function | () => void | --                                                  |

## Examples

TODO

## Usage

```jsx
import React from 'react';
import ListGallery from 'react-native-list-gallery';

function renderImage({ url }) {
  return <Image source={{ uri: url }} />;
}

// gallery component
function HelloImageGallery() {
  return (
    <ListGallery
      animated
      data={[
        { url: 'http://placeimg.com/920/480/any' },
        { url: 'http://placeimg.com/920/480/any' },
        { url: 'http://placeimg.com/920/480/any' },
        { url: 'http://placeimg.com/920/480/any' }
      ]}
      delay={3000}
      renderItem={renderImage}
    />
  );
}
```
