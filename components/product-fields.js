var YMIN = window.YMIN || {};

YMIN.productFields = (function () {
    'use strict';

    var CATEGORY = {
        liquid: '液态铝电解电容器',
        polymer: '高分子固态铝电解电容器',
        hybrid: '高分子混合动力铝电解电容器',
        doubleLayer: '双电层超级电容',
        lithium: '混合型超级电容（锂离子电容）',
        stacked: '叠层高分子固态铝电解电容器',
        tantalum: '导电高分子钽电解电容器',
        film: '薄膜电容器'
    };

    var commonFields = [
        ['category', '电容类别'],
        ['package', '形状'],
        ['itemNo', '产品料号'],
        ['series', '系列'],
        ['status', '全生命周期状态'],
        ['polarity', '极性'],
        ['voltage', '额定电压(V)'],
        ['capacity', '标称容量(µF)'],
        ['tolerance', '容差'],
        ['temperatureMin', '温度范围下限(°C)'],
        ['temperatureMax', '温度范围上限(°C)'],
        ['life', '额定寿命 (Hours)']
    ];

    var circularAluminumFields = [
        ['esr', 'ESR (mΩ max.)'],
        ['esrFrequency', 'ESR频率(kHz)'],
        ['ripple', '额定纹波电流(mArms)'],
        ['leakage', '漏电流(µA)Max'],
        ['tanDelta', '损失角正切 (tanδ max.)'],
        ['diameter', '直径D(mm)'],
        ['length', '高度L(mm)'],
        ['terminalPitch', '引脚/端子间距(mm)'],
        ['terminalMaterial', '端子电镀材质'],
        ['weight', '单重'],
        ['minimumPack', '最小包装数量'],
        ['aec', 'AEC-Q200'],
        ['rohs', 'RoHS指令'],
        ['remarks', '备注'],
        ['featureTags', '特性标签（关键词）']
    ];

    var liquidStandardFields = [
        ['esr', 'ESR (Ω max.)'],
        ['esrFrequency', 'ESR频率(kHz)'],
        ['ripple', '额定纹波电流(mArms)'],
        ['leakage', '漏电流(µA)Max'],
        ['tanDelta', '损失角正切 (tanδ max.)'],
        ['tanDeltaFrequency', '损失角频率(Hz)'],
        ['diameter', '直径D(mm)'],
        ['length', '高度L(mm)'],
        ['terminalPitch', '引脚/端子间距(mm)'],
        ['terminalMaterial', '端子电镀材质'],
        ['weight', '单重'],
        ['minimumPack', '最小包装数量'],
        ['aec', 'AEC-Q200'],
        ['rohs', 'RoHS指令'],
        ['remarks', '备注'],
        ['featureTags', '特性标签（关键词）']
    ];

    var liquidLargeFields = [
        ['esr', 'ESR (mΩ max.)'],
        ['esrFrequency', 'ESR频率(Hz)'],
        ['ripple', '额定纹波电流(mArms)'],
        ['leakage', '漏电流(µA)Max'],
        ['tanDelta', '损失角正切 (tanδ max.)'],
        ['diameter', '直径D(mm)'],
        ['length', '高度L(mm)'],
        ['terminalPitch', '引脚/端子间距(mm)'],
        ['terminalMaterial', '端子电镀材质'],
        ['terminalType', '端子种类'],
        ['weight', '单重'],
        ['minimumPack', '最小包装数量'],
        ['aec', 'AEC-Q200'],
        ['rohs', 'RoHS指令'],
        ['remarks', '备注'],
        ['featureTags', '特性标签（关键词）']
    ];

    var squareBaseFields = [
        ['esr', 'ESR (mΩ max.)'],
        ['esrFrequency', 'ESR频率(kHz)'],
        ['ripple', '额定纹波电流(mArms)'],
        ['leakage', '漏电流(µA)Max'],
        ['tanDelta', '损失角正切 (tanδ max.)'],
        ['length', '长L(mm)'],
        ['width', '宽W(mm)'],
        ['height', '高H(mm)'],
        ['terminalPitch', '引脚/端子间距(mm)'],
        ['terminalMaterial', '端子电镀材质'],
        ['weight', '单重'],
        ['minimumPack', '最小包装数量'],
        ['aec', 'AEC-Q200'],
        ['rohs', 'RoHS指令'],
        ['remarks', '备注'],
        ['featureTags', '特性标签（关键词）']
    ];

    var filmFields = [
        ['esr', 'ESR (mΩ max.)'],
        ['esrFrequency', 'ESR频率(10kHz)'],
        ['rippleFilm', '额定纹波电流(Arms)'],
        ['tanDelta1k', '损失角正切 (tanδ max.1k)'],
        ['tanDelta10k', '损失角正切 (tanδ max.10k)'],
        ['length', '长L(mm)'],
        ['width', '宽W(mm)'],
        ['height', '高H(mm)'],
        ['pinL1', '引脚L1(mm)'],
        ['terminalPitch', '端子间距(mm)'],
        ['terminalMaterial', '端子电镀材质'],
        ['weight', '单重'],
        ['minimumPack', '最小包装数量'],
        ['aec', 'AEC-Q200'],
        ['rohs', 'RoHS指令'],
        ['remarks', '备注'],
        ['featureTags', '特性标签（关键词）'],
        ['dvdt', 'dv/dt(V/μs)']
    ];

    var supercapFields = [
        ['esr', 'ESR (mΩ max.)'],
        ['esrFrequency', 'ESR频率(kHz)AC'],
        ['ripple', '额定纹波电流(mArms)'],
        ['diameter', '尺寸D(mm)'],
        ['length', '尺寸L(mm)'],
        ['terminalPitch', '引脚/端子间距(mm)'],
        ['terminalMaterial', '端子电镀材质'],
        ['weight', '单重'],
        ['minimumPack', '最小包装数量'],
        ['aec', 'AEC-Q200'],
        ['rohs', 'RoHS指令'],
        ['remarks', '备注'],
        ['featureTags', '特性标签（关键词）'],
        ['leakage72h', '72H漏电流(μA)'],
        ['maxChargeVoltage', '最高充电电压（V）'],
        ['maxChargeCurrent', '最大充电电流（A）'],
        ['peakCurrent', '峰值电流（A)'],
        ['continuousCurrent', '持续电流（A)']
    ];

    function normalizeLabel(value) {
        var text = String(value == null ? '' : value);
        if (text.normalize) text = text.normalize('NFKC');
        return text.toLowerCase().replace(/[\s\u3000]/g, '').replace(/[（）()［］\[\]／/、，,：:·._-]/g, '');
    }

    function specEntries(detail) {
        return Array.isArray(detail && detail.specFields) ? detail.specFields : [];
    }

    function findSpec(detail, names, excludes) {
        var wanted = names.map(normalizeLabel);
        var blocked = (excludes || []).map(normalizeLabel);
        var field = specEntries(detail).find(function (item) {
            var label = normalizeLabel(item.label);
            return wanted.some(function (name) { return label.indexOf(name) >= 0; }) &&
                !blocked.some(function (name) { return label.indexOf(name) >= 0; });
        });
        return field && field.value != null ? String(field.value).trim() : '';
    }

    function findSpecByTest(detail, test) {
        var field = specEntries(detail).find(function (item) { return test(String(item.label || ''), String(item.value || '')); });
        return field && field.value != null ? String(field.value).trim() : '';
    }

    function firstNumber(value) {
        var text = String(value == null ? '' : value);
        if (text.normalize) text = text.normalize('NFKC');
        text = text.replace(/[﹣−–—]/g, '-');
        var match = text.match(/[+-]?\d+(?:\.\d+)?/);
        return match ? Number(match[0]) : null;
    }

    function formatNumber(value, decimals) {
        var number = Number(value);
        if (!Number.isFinite(number)) return '';
        var precision = typeof decimals === 'number' ? decimals : 6;
        return Number(number.toFixed(precision)).toLocaleString('zh-CN', { maximumFractionDigits: precision });
    }

    function temperatureRange(product, detail) {
        var text = String(product.temperature || findSpec(detail, ['工作温度']) || '');
        if (text.normalize) text = text.normalize('NFKC');
        text = text.replace(/[﹣−–—]/g, '-');
        var matches = text.match(/[+-]?\d+(?:\.\d+)?/g) || [];
        return {
            min: matches.length ? Number(matches[0]) : null,
            max: matches.length > 1 ? Number(matches[1]) : null
        };
    }

    function lifecycleStatus(value) {
        var text = String(value || '');
        if (/不推荐|新项目/.test(text)) return '新项目不推荐';
        if (/新品/.test(text)) return '新品';
        return '量产品';
    }

    function aecValue(product, detail) {
        var raw = findSpec(detail || {}, ['aecq200']) || product.certification || '';
        return /符合|aec\s*-?\s*q200/i.test(String(raw)) ? '符合' : '';
    }

    function packageValue(product) {
        if (product.package) return product.package;
        if (product.category === CATEGORY.lithium) return '引线型';
        return '';
    }

    function isSuperCategory(category) {
        return category === CATEGORY.doubleLayer || category === CATEGORY.lithium;
    }

    function isLiquidLarge(product) {
        return product.category === CATEGORY.liquid && /基板自立型|螺栓型/.test(String(product.package || ''));
    }

    function variant(product) {
        if (isSuperCategory(product.category)) return product.package === '模组型' ? 'superModule' : 'superRound';
        if (product.category === CATEGORY.film) return 'film';
        if (product.category === CATEGORY.stacked) return 'stacked';
        if (product.category === CATEGORY.tantalum) return 'tantalum';
        if (product.category === CATEGORY.liquid) return isLiquidLarge(product) ? 'liquidLarge' : 'liquidStandard';
        if (product.category === CATEGORY.polymer || product.category === CATEGORY.hybrid) return 'circularAluminum';
        return 'generic';
    }

    function fieldDefinitions(product) {
        var kind = variant(product);
        var common = commonFields.map(function (field) { return field.slice(); });
        if (isSuperCategory(product.category)) common[7][1] = '标称容量(F)';
        if (kind === 'superModule') common[1][1] = '封装';
        var specific;
        if (kind === 'film') specific = filmFields;
        else if (kind === 'stacked') specific = squareBaseFields.map(function (field) {
            return field[0] === 'ripple' ? ['ripple', '额定纹波电流(mArms) / 45℃'] : field;
        });
        else if (kind === 'tantalum') specific = squareBaseFields;
        else if (kind === 'liquidLarge') specific = liquidLargeFields;
        else if (kind === 'liquidStandard') specific = liquidStandardFields;
        else if (kind === 'circularAluminum') specific = circularAluminumFields;
        else if (kind === 'superModule') specific = supercapFields.slice(0, 5).concat([['height', '尺寸H(mm)']]).concat(supercapFields.slice(5));
        else if (kind === 'superRound') specific = supercapFields;
        else specific = circularAluminumFields;
        return common.concat(specific).map(function (field) { return { key: field[0], label: field[1] }; });
    }

    function dimensionValue(product, key) {
        var kind = variant(product);
        if (kind === 'film' && key === 'length') return product.thickness || product.length || '';
        if (kind === 'superModule' && key === 'length') return product.height || product.length || '';
        if (kind === 'superModule' && key === 'height') return product.width || product.height || '';
        if (kind === 'superModule' && key === 'width') return '';
        return product[key] == null ? '' : product[key];
    }

    function frequency(value, label, targetUnit) {
        var text = String(label || '') + ' ' + String(value || '');
        var match = text.match(/(\d+(?:\.\d+)?)\s*(k?hz)/i);
        if (!match) return '';
        var number = Number(match[1]);
        var sourceUnit = match[2].toLowerCase();
        if (targetUnit === 'Hz' && sourceUnit === 'khz') number *= 1000;
        if (targetUnit === 'kHz' && sourceUnit === 'hz') number /= 1000;
        return formatNumber(number);
    }

    function esrUnit(product) {
        return variant(product) === 'liquidStandard' ? 'Ω' : 'mΩ';
    }

    function esrValue(product) {
        var rawValue = product.esrMilliOhm;
        var value = rawValue == null || rawValue === '' ? NaN : Number(rawValue);
        if (!Number.isFinite(value)) value = firstNumber(product.esr);
        if (!Number.isFinite(value)) return '';
        return esrUnit(product) === 'Ω' ? formatNumber(value / 1000) : formatNumber(value);
    }

    function rippleValue(product, inAmps) {
        var rawValue = product.rippleMilliAmp;
        var value = rawValue == null || rawValue === '' ? NaN : Number(rawValue);
        if (!Number.isFinite(value)) value = firstNumber(product.ripple);
        if (!Number.isFinite(value)) return '';
        return inAmps ? formatNumber(value / 1000) : formatNumber(value);
    }

    function numericSpec(detail, names, excludes) {
        var value = findSpec(detail, names, excludes);
        var number = firstNumber(value);
        return number == null ? value : formatNumber(number);
    }

    function valueFor(product, detail, key) {
        var temperatures = temperatureRange(product, detail);
        var kind = variant(product);
        var tanValue = findSpec(detail, ['损失角正切', '损耗角正切']);
        var esrSpec = findSpecByTest(detail, function (label) { return /ESR/i.test(label); });
        switch (key) {
            case 'category': return product.category || '';
            case 'package': return packageValue(product);
            case 'itemNo': return product.itemNo || '';
            case 'series': return product.series || '';
            case 'status': return lifecycleStatus(product.status);
            case 'polarity': return findSpec(detail, ['极性']);
            case 'voltage': return kind === 'film' ? (product.voltage || findSpec(detail, ['额定电压'])) : numericSpec(detail, ['额定电压']) || formatNumber(product.voltageNumber);
            case 'capacity': return numericSpec(detail, ['静电容量', '标称容量', '电容量'], ['允许偏差']) || (isSuperCategory(product.category) ? formatNumber(Number(product.capacitanceUf) / 1000000) : formatNumber(product.capacitanceUf));
            case 'tolerance': return findSpec(detail, ['容量允许偏差', '容差']);
            case 'temperatureMin': return temperatures.min == null ? '' : formatNumber(temperatures.min);
            case 'temperatureMax': return temperatures.max == null ? '' : formatNumber(temperatures.max);
            case 'life': return product.life || findSpec(detail, ['寿命']);
            case 'esr': return esrValue(product);
            case 'esrFrequency': return frequency(product.esr || esrSpec, specEntries(detail).filter(function (item) { return /ESR/i.test(item.label || ''); }).map(function (item) { return item.label; }).join(' '), (kind === 'liquidLarge' ? 'Hz' : 'kHz'));
            case 'ripple': return rippleValue(product, false);
            case 'rippleFilm': return rippleValue(product, true);
            case 'leakage': return numericSpec(detail, ['漏电流'], ['72h']);
            case 'leakage72h': return numericSpec(detail, ['72h漏电流']);
            case 'tanDelta': return firstNumber(tanValue) == null ? tanValue : formatNumber(firstNumber(tanValue));
            case 'tanDeltaFrequency': return frequency(tanValue, findSpecByTest(detail, function (label) { return /tan/i.test(label); }), 'Hz');
            case 'tanDelta1k': {
                var oneK = findSpecByTest(detail, function (label) { return /tan/i.test(label) && /1\s*k/i.test(label) && !/10\s*k/i.test(label); }) ||
                    findSpecByTest(detail, function (label) { return /tan/i.test(label) && !/\d+\s*k/i.test(label); });
                return firstNumber(oneK) == null ? oneK : formatNumber(firstNumber(oneK));
            }
            case 'tanDelta10k': {
                var tenK = findSpecByTest(detail, function (label) { return /tan/i.test(label) && /10\s*k/i.test(label); });
                return firstNumber(tenK) == null ? tenK : formatNumber(firstNumber(tenK));
            }
            case 'diameter': return dimensionValue(product, 'diameter');
            case 'length': return dimensionValue(product, 'length');
            case 'width': return dimensionValue(product, 'width');
            case 'height': return dimensionValue(product, 'height');
            case 'pinL1': return findSpec(detail, ['引脚l1']);
            case 'terminalPitch': return findSpec(detail, ['引脚端子间距', '端子间距', '引脚间距']);
            case 'terminalMaterial': return findSpec(detail, ['端子电镀材质', '端子材质']);
            case 'terminalType': return findSpec(detail, ['端子种类']);
            case 'weight': return findSpec(detail, ['单重', '参考重量']);
            case 'minimumPack': return findSpec(detail, ['最小包装', '包装数量', '封装数量']);
            case 'aec': return aecValue(product, detail);
            case 'rohs': return findSpec(detail, ['rohs指令', 'rohs']) || product.rohs || '';
            case 'remarks': return findSpec(detail, ['备注']);
            // 事业部确认：特性标签（关键词）对应产品库 description 字段，详情页按换行拆分展示。
            case 'featureTags': return findSpec(detail, ['特性标签']) || product.description || '';
            case 'dvdt': return findSpec(detail, ['电压变化速率', 'dvdt']);
            case 'maxChargeVoltage': return findSpec(detail, ['最高充电电压']);
            case 'maxChargeCurrent': return findSpec(detail, ['最大充电电流']);
            case 'peakCurrent': return findSpec(detail, ['峰值电流']);
            case 'continuousCurrent': return findSpec(detail, ['持续电流']);
            default: return '';
        }
    }

    function detailFields(product, detail) {
        return fieldDefinitions(product).map(function (field) {
            return { key: field.key, label: field.label, value: valueFor(product, detail, field.key) };
        });
    }

    function fieldValue(fields, key) {
        var field = (fields || []).find(function (item) { return item.key === key; });
        return field ? field.value : '';
    }

    function dimensionFields(product) {
        var kind = variant(product);
        if (kind === 'film' || kind === 'stacked' || kind === 'tantalum') return [
            { key: 'length', symbol: 'L', label: '长', value: dimensionValue(product, 'length') },
            { key: 'width', symbol: 'W', label: '宽', value: dimensionValue(product, 'width') },
            { key: 'height', symbol: 'H', label: '高', value: dimensionValue(product, 'height') }
        ];
        if (kind === 'superModule') return [
            { key: 'diameter', symbol: 'D', label: '尺寸 D', value: dimensionValue(product, 'diameter') },
            { key: 'length', symbol: 'L', label: '尺寸 L', value: dimensionValue(product, 'length') },
            { key: 'height', symbol: 'H', label: '尺寸 H', value: dimensionValue(product, 'height') }
        ];
        return [
            { key: 'diameter', symbol: 'D', label: kind === 'superRound' ? '尺寸 D' : '直径 D', value: dimensionValue(product, 'diameter') },
            { key: 'length', symbol: 'L', label: kind === 'superRound' ? '尺寸 L' : '高度 L', value: dimensionValue(product, 'length') }
        ];
    }

    function listDimensionLabel(categories, packageName, key) {
        var list = Array.isArray(categories) ? categories : [];
        var square = list.length && list.every(function (category) { return [CATEGORY.film, CATEGORY.stacked, CATEGORY.tantalum].indexOf(category) >= 0; });
        var superOnly = list.length && list.every(isSuperCategory);
        if (key === 'diameter') return superOnly ? '尺寸 D' : '直径 D';
        if (key === 'length') return square ? '长 L' : (superOnly ? '尺寸 L' : '高度 L');
        if (key === 'width') return '宽 W';
        if (key === 'height') return superOnly ? '尺寸 H' : '高 H';
        return key;
    }

    return {
        CATEGORY: CATEGORY,
        detailFields: detailFields,
        fieldValue: fieldValue,
        dimensionFields: dimensionFields,
        dimensionValue: dimensionValue,
        listDimensionLabel: listDimensionLabel,
        temperatureRange: temperatureRange,
        lifecycleStatus: lifecycleStatus,
        aecValue: aecValue,
        packageValue: packageValue,
        esrUnit: esrUnit,
        variant: variant,
        isLiquidLarge: isLiquidLarge,
        isSuperCategory: isSuperCategory
    };
})();
