import type {ComponentType} from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DocCardList from '@theme/DocCardList'

const components: typeof MDXComponents & {
    Tabs: ComponentType<any>;
    TabItem: ComponentType<any>;
    DocCardList: ComponentType<any>;
} = {
  ...MDXComponents,
  Tabs,
  TabItem,
  DocCardList,
};

export default components;