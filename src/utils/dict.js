import useDictStore from '@/store/modules/dict'
import { getDicts } from '@/api/system/dict/data'

export const dicts = {
  shelfFlag: [{
    key: 0,
    value: '下架'
  }, {
    key: 1,
    value: '上架'
  }],
  goodType: [
    {
      key: 0,
      value: '藏品'
    }, {
      key: 1,
      value: '盲盒'
    }
  ]
}

export const getDict = (dict, _key) => {
  if (!dict || _key == null && _key == "") {
    return null;
  }
  try {
    if (dicts[dict]) {
      for (let i = 0; i < dicts[dict].length; i++) {
        if (dicts[dict][i].key == _key) {
          return dicts[dict][i].value;
        }
      }
    } else {
      return null;
    }


  } catch (e) {
    return null;
  }
}

/**
 * 获取字典数据
 */
export function useDict (...args) {
  const res = ref({});
  return (() => {
    args.forEach((dictType, index) => {
      res.value[dictType] = [];
      const dicts = useDictStore().getDict(dictType);
      if (dicts) {
        res.value[dictType] = dicts;
      } else {
        getDicts(dictType).then(resp => {
          res.value[dictType] = resp.data.map(p => ({ label: p.dictLabel, value: p.dictValue, elTagType: p.listClass, elTagClass: p.cssClass }))
          useDictStore().setDict(dictType, res.value[dictType]);
        })
      }
    })
    return toRefs(res.value);
  })()
}