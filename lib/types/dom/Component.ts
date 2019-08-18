import { Props } from '.';

export interface Component<P extends Props> extends Function {
  componentShouldUpdate?: (props: P, nextProps: P) => boolean
  componentWillUpdate?: (nextProps: P) => void
  componentDidUpdate?: (props: P) => void
  componentWillMount?: (props: P) => void
  componentDidMount?: (props: P) => void
  componentWillUnmount?: (props: P) => void
}
