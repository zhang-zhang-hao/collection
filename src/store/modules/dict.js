const useDictStore = defineStore(
  'dict',
  {
    state: () => ({
      dict: {
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
    }),
    actions: {
      // 获取字典
      getDict (dict, _key) {
        if (!dict || _key == null && _key == "") {
          return null;
        }
        try {
          if (this.dict[dict]) {
            for (let i = 0; i < this.dict[dict].length; i++) {
              if (this.dict[dict][i].key == _key) {
                return this.dict[dict][i].value;
              } else {
                return '-'
              }
            }
          } else {
            return null;
          }


        } catch (e) {
          return null;
        }
      },
      // 设置字典
      setDict (_key, value) {
        if (_key !== null && _key !== "") {
          this.dict.push({
            key: _key,
            value: value
          });
        }
      },
      // 删除字典
      removeDict (_key) {
        var bln = false;
        try {
          for (let i = 0; i < this.dict.length; i++) {
            if (this.dict[i].key == _key) {
              this.dict.splice(i, 1);
              return true;
            }
          }
        } catch (e) {
          bln = false;
        }
        return bln;
      },
      // 清空字典
      cleanDict () {
        this.dict = new Array();
      },
      // 初始字典
      initDict () {
      }
    }
  })

export default useDictStore
