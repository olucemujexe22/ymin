(function (global) {
    'use strict';

    var PDF_ROOT = 'https://www.ymin.com';

    // Source: production database table tp_xilie_detail.cpml (active rows only).
    // The newest active record is used when the same series has more than one entry.
    var sourceFiles = {
        'CN3': '/uploads/files/20240112/b917f813efd2b16c52450563f8b44a3c.pdf',
        'CN6': '/uploads/files/20240112/1adc3d277a22efab4d9cdd1f5bdcced0.pdf',
        'CW3': '/uploads/files/20231213/4d9b2af2ce730fadef14feaafa431c68.pdf',
        'CW3H': '/uploads/files/20240112/c98a29816d31c3c13b147eede9951ca2.pdf',
        'CW3S': '/uploads/files/20240112/9da7e3edbb958fea6e98358837767720.pdf',
        'CW6': '/uploads/files/20231211/c7b3e231a24397ee7ecd3fe3e17a6767.pdf',
        'CW6H': '/uploads/files/20240112/892b977817e16647f01bc7792cab105d.pdf',
        'EH3': '/uploads/files/20240112/5f2afc416adc8807f777d2712d356e60.pdf',
        'EH6': '/uploads/files/20240112/9b4ee2f8fe720769f9af0adba585142e.pdf',
        'ES3': '/uploads/files/20231211/fbeba796fadfdcf3c196f8fc5df160d6.pdf',
        'ES3M': '/uploads/files/20240112/b863f67dcf703b1660649f9748aa566c.pdf',
        'ES6': '/uploads/files/20240112/ec3cdfb035b5f2985adb2ad2a332f028.pdf',
        'EW3': '/uploads/files/20240112/4236d27e641c81aad30a324b16e45d93.pdf',
        'EW6': '/uploads/files/20240112/940b89cc30daaaf516ed26d960e526bf.pdf',
        'H': '/uploads/files/20231211/161a4de496783ccab30f0a0644253a67.pdf',
        'IDC3': '/uploads/files/20231213/4d9b2af2ce730fadef14feaafa431c68.pdf',
        'KCG': '/uploads/files/20240815/fd7a5362f0e043aa3b968f01de633579.pdf',
        'KCM': '/uploads/files/20240815/b07778c6d2767b57dd6126b95f860c1b.pdf',
        'KCX': '/uploads/files/20240815/4b9713a5a2204b9ed1a4e2db8a661023.pdf',
        'L3M': '/uploads/files/20240815/85f7fbe7eee79ef8d8895b674c667035.pdf',
        'LK': '/uploads/files/20240815/5f96deaafda836aee1d41007c10e25eb.pdf',
        'LK7': '/uploads/files/20240815/8220b589d2398d8673db44d1c8df920b.pdf',
        'LKD': '/uploads/files/20240815/acd5248651ed4de1c4828de9cd2c74db.pdf',
        'LKE': '/uploads/files/20240815/5f96deaafda836aee1d41007c10e25eb.pdf',
        'LKF': '/uploads/files/20240815/8480c273e80c2682303c393895f79ed5.pdf',
        'LKG': '/uploads/files/20240815/f39851d1ca732e16630247bce2e67875.pdf',
        'LKJ': '/uploads/files/20240815/14d499a89dad846c08a2ea3ac5e7761e.pdf',
        'LKL': '/uploads/files/20240815/fa456fc842ee99ebda86eaadb1699610.pdf',
        'LKL(R)': '/uploads/files/20240815/8f18da10f519570b270b3af71a5d6961.pdf',
        'LKM': '/uploads/files/20240815/bd1573995135fe87c7ffa09cac74d7dd.pdf',
        'LKX': '/uploads/files/20240815/c7814b8043deac517462bc7d32b5e107.pdf',
        'LKZ': '/uploads/files/20240815/87b2214610cd57d71f7268470f43867e.pdf',
        'LLK': '/uploads/files/20240815/b9b7cb1c8fcccb60151ce756b53cdc36.pdf',
        'LMM': '/uploads/files/20240815/37bb83fe7da5b0af0b8f1077739c8e6a.pdf',
        'MAP': '/uploads/files/20250406/c420c8a58e917a972ef558050a18b4ea.pdf',
        'MDP': '/uploads/files/20251217/719f4bafe71e533fc64f8777d377d067.pdf',
        'MDP(X)': '/uploads/files/20250406/MDP(X).pdf',
        'MDP-K': '/uploads/files/20250406/c420c8a58e917a972ef558050a18b4ea.pdf',
        'MPB19': '/uploads/files/20240113/4fe04d84a3d7a6b1e94fb0b9123a0544.pdf',
        'MPD10': '/uploads/files/20240113/16a82cb1d8c6419742f6a663a7800eb2.pdf',
        'MPD15': '/uploads/files/20240113/8fb06a38d91206a86ec12c0a1703eaf7.pdf',
        'MPD19': '/uploads/files/20231211/6a166a70ae33416a349c7e79815219ad.pdf',
        'MPD28': '/uploads/files/20240113/6118f27e19aae37cbe7d8adf9090321b.pdf',
        'MPS': '/uploads/files/20240113/8eb73d15df2bcd206230eccdbbdd3ab8.pdf',
        'MPU41': '/uploads/files/20240113/ceb938f0fb6bd12bcffed746bb7ecbd0.pdf',
        'MPX': '/uploads/files/20240113/3b70e1be1a9e8b5259121296ec1bd8b9.pdf',
        'NGY': '/uploads/files/20251213/331cfd9e066ace10b59ed58d6c696253.pdf',
        'NHT': '/uploads/files/20251213/4483b64916a28cba48a950bc402eb766.pdf',
        'NHX': '/uploads/files/NHX/NHX.pdf',
        'NP1': '/uploads/files/20240117/5b23ee2a764efdbf1d68102abe32cf18.pdf',
        'NPG': '/uploads/files/固态目录册PDF11.14/NPG.pdf',
        'NPH': '/uploads/files/固态目录册PDF11.14/NPH.pdf',
        'NPL': '/uploads/files/固态目录册PDF11.14/NPL.pdf',
        'NPM': '/uploads/files/固态目录册PDF11.14/NPM.pdf',
        'NPS': '/uploads/files/20240117/a5596090c7da2d352040bee1553096d7.pdf',
        'NPT': '/uploads/files/固态目录册PDF11.14/NPT.pdf',
        'NPX': '/uploads/files/20251213/7d6d11524ae4ba62528c790db6194c8f.pdf',
        'Q': '/uploads/files/20231211/c3e566881d6bb9ce0b1ba2a06f3af9a1.pdf',
        'SDA': '/uploads/files/20260127/6db549fde17582294cdf5f2c4b27ab46.pdf',
        'SDB': '/uploads/files/20260127/e1e3b3712819bc25dd795d6e870a8753.pdf',
        'SDH': '/uploads/files/20260127/2f1a17a2d80375b1b3383b51132720dd.pdf',
        'SDL': '/uploads/files/20260127/6e1b520f745dad6ee31a915b8cbbf78e.pdf',
        'SDM': '/uploads/files/20260127/f6b02f52cd34c4c6f678b0b1517bdbb8.pdf',
        'SDN1': '/uploads/files/20240124/dec2d84ff4f747be85c83740b450b82e.pdf',
        'SDN2': '/uploads/files/20240124/824fc64f5ed983c08c974b3bef807daf.pdf',
        'SDS': '/uploads/files/20260127/a4e82881fe816defc9c5018e6422ffe5.pdf',
        'SDV2.7V': '/uploads/files/20260127/23064ae8481d98ece2bb89b8bc693a01.pdf',
        'SDV3.0V': '/uploads/files/20260127/0a8f1f64045c7b0d6b2f651c1e89ddec.pdf',
        'SH15': '/uploads/files/20240112/f8266574f253080ff9ac0f4e5d748df8.pdf',
        'SLA': '/uploads/files/20260126/14a1f2f06d59390323128e5069c4be17.pdf',
        'SLA(H)': '/uploads/files/20260126/2642f9e5260f38e37805c302b3e978ee.pdf',
        'SLD': '/uploads/files/20260130/57233bedb6150e6067b278e35e1cb10a.pdf',
        'SLR': '/uploads/files/20260130/5788ecaa6225b03686a9db98bd326946.pdf',
        'SLX': '/uploads/files/20260126/2ee492cd7b222a99d88cf5d452e5edf3.pdf',
        'SM': '/uploads/files/20260127/bdfd3c18fd77c4532772a8544569663d.pdf',
        'SN3': '/uploads/files/20240112/bc67fddae9a1043115c1af84b6d0431d.pdf',
        'SN6': '/uploads/files/20240112/3c867463a2b84442c9534f9b1a20e006.pdf',
        'SV': '/uploads/files/20240124/d24b60f3f40571d0e6df8ca746e97922.pdf',
        'SW3': '/uploads/files/20240112/97fd6e11c5352db18581ac8eaf94b88c.pdf',
        'SW6': '/uploads/files/20240112/061bea6f575ffae07a895179ece382e7.pdf',
        'TPA16': '/uploads/files/20240717/2114ac76ef2cb117a61235e3bf799354.pdf',
        'TPB14': '/uploads/files/20260127/7edd9c8b16ba89db3dc79b4de5c6aaae.pdf',
        'TPB19': '/uploads/files/20240717/6906994c4cc1cbca3d648492c00480f3.pdf',
        'TPB26': '/uploads/files/20240717/8640f57ad678621c048d45415293f3b0.pdf',
        'TPD15': '/uploads/files/20240717/88af59e6c8d398f285b75afb1f99edf5.pdf',
        'TPD40': '/uploads/files/20240717/b80d33f3b453769122b76b1d94cd7b6f.pdf',
        'TQB19': '/uploads/files/20260128/98f38fea19f1f6c1ad72ccd340546542.pdf',
        'TQD15': '/uploads/files/20260128/ac4d934d1a19d17aa9763f5308710ed5.pdf',
        'TQD19': '/uploads/files/20260128/3ccb2399985849cf3df1395a8df2d3f3.pdf',
        'TQD28': '/uploads/files/20260128/54b104c6964b2604a206167ac35b215d.pdf',
        'TQD42': '/uploads/files/20260128/647e99614e4f711e01cbac5e6ce868eb.pdf',
        'TQW19': '/uploads/files/20260128/ed9915cda2d51444b72330663ba061ad.pdf',
        'TQW42': '/uploads/files/20260128/d217ef96efa3f8ffd8593b0e5565f136.pdf',
        'V3M': '/uploads/files/20231211/cf00e7ba147812bc885a9e9cc9aceb19.pdf',
        'V3M(TM)': '/uploads/files/20231225/942628aab165e003eda81b56b95dfe22.pdf',
        'V3MC': '/uploads/files/20240103/540f1e57440554acc8b0e292183abed5.pdf',
        'V3MC(TM)': '/uploads/files/20240103/2913008168780342dc8b72eb832ec889.pdf',
        'V4M': '/uploads/files/20240104/bc1434e2c8ad6034f9dca2bc7f9f3b11.pdf',
        'VGY(KZ)': '/uploads/files/20251213/ff965f528f05055398ff04799f31e8de.pdf',
        'VGY(TM)': '/uploads/files/20251213/d691667094068d589170df0395d334ec.pdf',
        'VHM(KZ)': '/uploads/files/20251213/de4aa56a0b2a99aa93c2379c6f64ed04.pdf',
        'VHM(TM)': '/uploads/files/20251213/6c6eee19cb941ea1f220821feb929f2d.pdf',
        'VHR(KZ)': '/uploads/files/20251213/4db5db7e469d8652fb9549a94f46e9c3.pdf',
        'VHR(TM)': '/uploads/files/20251213/feeebf0305624e30d71d9f95890fd869.pdf',
        'VHT(KZ)': '/uploads/files/20251213/83a414cf7e276a3aa900c69c2f351412.pdf',
        'VHT(TM)': '/uploads/files/20251213/486a9117b2278eb05cf7553983a98c70.pdf',
        'VHU(KZ)': '/uploads/files/20251213/510c27f5594a0a9b0012153c3f41e36e.pdf',
        'VHU(TM)': '/uploads/files/20251213/1a06671ecf67c97debd757310ea26d70.pdf',
        'VHX(KZ)': '/uploads/files/20251213/4a4af5c461fe4160c0570aaef8de1486.pdf',
        'VHX(TM)': '/uploads/files/20251213/f564de1f0e171ce2cd470c10e9c94a5e.pdf',
        'VK7': '/uploads/files/20240105/a25001fdb9b05f8002128f4e7355b194.pdf',
        'VK7(TM)': '/uploads/files/20240105/8eb950bfd4b613a1aff919e1ba5e319b.pdf',
        'VKG': '/uploads/files/20240106/e125c9ae0a911d985b9de220a5277f22.pdf',
        'VKG(TM)': '/uploads/files/20240106/ae071a0a4f0b0c36152a2b8d63e57fe9.pdf',
        'VKL': '/uploads/files/20240106/2c99157d51cfcae97b28aa10dd6c4eb0.pdf',
        'VKL(R)': '/uploads/files/20240106/8765e18c21cad8e21c912a1c48c506d2.pdf',
        'VKL(R)(TM)': '/uploads/files/20240106/c8c21970389d6623799fb813e8056db2.pdf',
        'VKL(TM)': '/uploads/files/20240106/5998b9a214c1d53dd25580a897bef94f.pdf',
        'VKM': '/uploads/files/20240106/5c0810681891e275d0cd03d0fe8e664f.pdf',
        'VKM(TM)': '/uploads/files/20240106/fdb6218bd31a1600992188819a636578.pdf',
        'VKO': '/uploads/files/20240106/8435b8154441d1e0a34143dac903e40c.pdf',
        'VKO(TM)': '/uploads/files/20240106/1354c460b51c93e1ddb4b189cbc1c15f.pdf',
        'VMM': '/uploads/files/20231211/d301fa4548ee1584b11c98ff1f681354.pdf',
        'VMM(TM)': '/uploads/files/20240103/a19688cdac2d46909cb74e655cb41925.pdf',
        'VP1': '/uploads/files/20251213/65169e837b2818c6f4fd4f7b4436e900.pdf',
        'VP4': '/uploads/files/20251213/59e575e5e27994bca861d77177eb7447.pdf',
        'VPC': '/uploads/files/20240117/e57242692b6bb2dcdc5a414c966010eb.pdf',
        'VPG': '/uploads/files/20251213/c67a8d29b51e9b23300f86cfd647abd9.pdf',
        'VPH': '/uploads/files/20251213/06dcd525d99fc680e830112e1145a0ba.pdf',
        'VPL': '/uploads/files/20251213/f72de9cba1049b75d7f07376d356b52d.pdf',
        'VPM': '/uploads/files/20240117/4ef02243444493f3454e90a4c0215ba6.pdf',
        'VPS': '/uploads/files/20240117/fe50ecab5ac5fb44f2e533eef8e04112.pdf',
        'VPT': '/uploads/files/20251213/88c7ab35020251d8bb6b597f8c7f786e.pdf',
        'VPW': '/uploads/files/20251213/67e488d32899d4840f2ecd925e3dc812.pdf',
        'VPX': '/uploads/files/20251213/8a468cde918a73617a81722c5117a2df.pdf'
    };

    function normalize(value) {
        return String(value || '')
            .normalize('NFKC')
            .replace(/\s+/g, '')
            .toUpperCase();
    }

    var files = {};
    Object.keys(sourceFiles).forEach(function (series) {
        files[normalize(series)] = PDF_ROOT + sourceFiles[series];
    });

    function variantSeries(product) {
        var series = normalize(product && product.series);
        var itemNo = normalize(product && product.itemNo);
        var match;

        if (series === 'MPD') {
            match = itemNo.match(/D(10|15|19|28)/);
            if (match) return 'MPD' + match[1];
        }

        // The current official TPD19 detail page points its product-directory
        // action to the TPD15 PDF, so the demo preserves that live-site rule.
        if (series === 'TPD' || series === 'TPD19') {
            match = itemNo.match(/D(15|19|40)/);
            if (match) return match[1] === '19' ? 'TPD15' : 'TPD' + match[1];
        }

        if (series === 'SDN') return 'SDN1';

        if (series === 'SDV') {
            var voltage = Number(product && product.voltageNumber);
            if (!Number.isFinite(voltage)) {
                match = itemNo.match(/^SDV(2R7|3R0)/);
                voltage = match && match[1] === '3R0' ? 3 : 2.7;
            }
            return voltage >= 2.9 ? 'SDV3.0V' : 'SDV2.7V';
        }

        // The current product table retains the R/T suffix in the displayed
        // series name, while the production series-PDF table records these
        // terminal variants under the TM title.
        if (series === 'V3M(R)') return 'V3M(TM)';
        if (series === 'VKL(T)') return 'VKL(TM)';

        if (/^(VGY|VHM|VHR|VHT|VHU|VHX)$/.test(series)) {
            return series + (itemNo.indexOf('KZ') >= 0 ? '(KZ)' : '(TM)');
        }

        return series;
    }

    function resolve(product) {
        if (!product) return '';
        var selected = variantSeries(product);
        return files[normalize(selected)] || files[normalize(product.series)] || '';
    }

    global.YMIN_SERIES_DATASHEETS = {
        source: 'production:yongming.tp_xilie_detail.cpml',
        synchronizedAt: '2026-08-07',
        files: files,
        resolve: resolve
    };
})(window);
