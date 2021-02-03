<template>
  <div>
    <div>test2</div>
    <auth ele="test2Block" name="test2的块" authType="abc">test2</auth>
    <auth ele="test5Block" name="test5的块" :authType="'abce'">test5</auth>
    <auth ele="test2Block" name="test4的块">test4</auth>
    <div>test5</div>

    <test-1 />
    <test-block />
  </div>
</template>

<script>
import Test1 from './test_1'
import Test3 from './test_3'

export default {
  name: 'Test2',
  components: {
    Test1,
    'test-block': Test3
  }
}
</script>
