// pages/index/index.js
Page({
  data: {
    formData: {
      ageNow: 48,
      city: '北京',
      yearsPaidNow: 23,
      indexNow: 3,
      personalBalanceNow: 415000,
      agePlan1: 50,
      agePlan2: 55,
      base1: 12049,
      base2: 13000,
      factor1: 195,
      factor2: 170,
      indexFuture: 0.6,
      unempIncome: 2286,
      flexPay: 1432.4,
      flexToPersonal: 572.97,
      flexPayAfterSubsidy: 669.58,
      unempYears: 2,
      flexYears: 3
    },
    result: null
  },

  // 国家标准计发月数表
  N_TABLE: {
    50: 195, 51: 190, 52: 185, 53: 180, 54: 175,
    55: 170, 56: 164, 57: 158, 58: 152, 59: 145,
    60: 139, 61: 132, 62: 125, 63: 117, 64: 109,
    65: 101, 66: 93, 67: 84, 68: 75, 69: 65
  },

  onLoad() {
    this.updateFactors()
    this.runCalc()
  },

  // 输入框变化处理
  onInputChange(e) {
    const { field } = e.currentTarget.dataset
    const { value } = e.detail
    this.setData({
      [`formData.${field}`]: value
    })
  },

  // 退休年龄变化处理
  onPlanAgeChange(e) {
    const { field } = e.currentTarget.dataset
    const { value } = e.detail
    this.setData({
      [`formData.${field}`]: value
    }, () => {
      this.updateFactors()
    })
  },

  // 更新计发月数
  updateFactors() {
    const { agePlan1, agePlan2 } = this.data.formData
    const factor1 = this.N_TABLE[parseInt(agePlan1)] || 0
    const factor2 = this.N_TABLE[parseInt(agePlan2)] || 0
    
    this.setData({
      'formData.factor1': factor1,
      'formData.factor2': factor2
    })
  },

  // 格式化数字
  fmt(v, d = 2) {
    return parseFloat(v).toFixed(d)
  },

  // 转换为数字
  n(value) {
    const v = parseFloat(value)
    return isNaN(v) ? 0 : v
  },

  // 开始计算
  runCalc() {
    const form = this.data.formData
    
    const ageNow = this.n(form.ageNow)
    const city = form.city || '—'
    const yearsPaidNow = this.n(form.yearsPaidNow)
    const indexNow = this.n(form.indexNow)
    const balanceNow = this.n(form.personalBalanceNow)

    const agePlan1 = this.n(form.agePlan1)
    const agePlan2 = this.n(form.agePlan2)
    const delayYears = agePlan2 - agePlan1

    if (delayYears <= 0) {
      this.setData({
        result: {
          error: '方案 2 的退休年龄必须大于方案 1，请重新设置。'
        }
      })
      return
    }

    const base1 = this.n(form.base1)
    const base2 = this.n(form.base2)
    const factor1 = this.n(form.factor1)
    const factor2 = this.n(form.factor2)

    const indexFuture = this.n(form.indexFuture)
    const unempIncome = this.n(form.unempIncome)
    const flexPay = this.n(form.flexPay)
    const flexToPersonal = this.n(form.flexToPersonal)
    const flexPayAfterSubsidy = this.n(form.flexPayAfterSubsidy)

    // 失业金年数自动约束
    let unempYearsWanted = this.n(form.unempYears)
    const unempYears = Math.min(unempYearsWanted, delayYears, 2)
    
    const flexYears = this.n(form.flexYears)

    // 方案 1 计算
    const baseP1 = ((base1 * (1 + indexNow)) / 2) * yearsPaidNow * 0.01
    const indivP1 = factor1 > 0 ? balanceNow / factor1 : 0
    const monthP1 = baseP1 + indivP1
    const p1Income = monthP1 * 12 * delayYears

    // 方案 2 计算
    const years2 = yearsPaidNow + delayYears
    const avgIndex2 = years2 > 0 ? (indexNow * yearsPaidNow + indexFuture * delayYears) / years2 : 0

    const baseP2 = ((base2 * (1 + avgIndex2)) / 2) * years2 * 0.01

    const netPhase1 = (unempIncome - flexPay) * 12 * unempYears
    const costPhase2 = flexPayAfterSubsidy * 12 * flexYears
    const netDelay = costPhase2 - netPhase1

    const addPersonal = flexToPersonal * 12 * delayYears
    const balance2 = balanceNow + addPersonal
    const indivP2 = factor2 > 0 ? balance2 / factor2 : 0
    const monthP2 = baseP2 + indivP2

    const lostIncome = p1Income + netDelay
    const deltaMonth = monthP2 - monthP1

    let beMonths = null, beYears = null, beAge = null
    if (deltaMonth > 0) {
      beMonths = lostIncome / deltaMonth
      beYears = beMonths / 12
      beAge = agePlan2 + beYears
    }

    const baseDiff = baseP2 - baseP1
    const indivDiff = indivP2 - indivP1

    // 生成建议
    let coreAgeText = ''
    let coreAdvice = ''
    if (deltaMonth > 0 && beAge && isFinite(beAge)) {
      coreAgeText = `${this.fmt(beAge)} 岁`
      coreAdvice = `✔ 若你预期能活到约 ${this.fmt(beAge)} 岁以上且不太缺延迟期间现金流，可考虑方案 2 提升长期养老金水平。<br>✔ 若你对寿命预期更保守，或对方案 1 的前 ${delayYears} 年现金流更看重，则方案 1 的风险收益比更友好。`
    } else if (deltaMonth <= 0) {
      coreAgeText = '无回本点'
      coreAdvice = '当前参数下，方案 2 在退休后每月并没有明显优势，甚至可能更低，因此从纯财务角度看，方案 1 明显更优。'
    } else {
      coreAgeText = '—'
      coreAdvice = '参数组合导致无法可靠计算回本点，请检查计发基数、缴费年限等输入是否合理。'
    }

    this.setData({
      result: {
        agePlan1: agePlan1,
        agePlan2: agePlan2,
        delayYears: delayYears,
        monthP1: this.fmt(monthP1),
        monthP2: this.fmt(monthP2),
        deltaMonth: this.fmt(deltaMonth),
        coreAgeText: coreAgeText,
        baseP1: this.fmt(baseP1),
        baseP2: this.fmt(baseP2),
        baseDiff: this.fmt(baseDiff),
        indivP1: this.fmt(indivP1),
        indivP2: this.fmt(indivP2),
        indivDiff: this.fmt(indivDiff),
        factor1: factor1,
        factor2: factor2,
        p1Income: this.fmt(p1Income),
        netDelay: this.fmt(netDelay),
        lostIncome: this.fmt(lostIncome),
        beYears: beYears ? this.fmt(beYears) : null,
        beAge: beAge ? this.fmt(beAge) : null,
        city: city,
        ageNow: ageNow,
        yearsPaidNow: yearsPaidNow,
        coreAdvice: coreAdvice
      }
    })

    // 更新失业金年数到表单
    this.setData({
      'formData.unempYears': unempYears
    })
  }
})