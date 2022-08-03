
const Data = {
    glyphs: () => m.request({ method: 'GET', url: 'data/glyphs.json' })
};

const Filter = {
    controller: function() {
        this.searchTerm = m.prop('');
    },
    view: (ctrl) => {
        return m('input.form-control', { placeholder: 'Filtrar iconos...', oninput: m.withAttr('value', ctrl.searchTerm) });
    }
};

const ForegroundColor = {
    controller: function() {
        this.fgColor = m.prop('');
    },
    view: (ctrl) => {
        return m('input.form-control', { placeholder: 'Color de los iconos', oninput: m.withAttr('value', ctrl.fgColor) });
    }
};

const List = {
    controller: function(options) {
        return {
            glyphs: Data.glyphs(),
            visible: options.visible,
            fgColor: options.fgColor
        };
    },
    view: (ctrl) => {
        return ctrl
            .glyphs()
            .sort((a, b) => a.file > b.file ? 1 : a.file < b.file ? -1 : 0)
            .filter(ctrl.visible)
            .map(glyph => m('div.col-sm-2.icon-block', [
                m(`i.gi.gi-${glyph.file}.icon-md`, { style: { color: ctrl.fgColor() }}),
                m('br'),
                m(`a[target="_blank"][href="./svg/${glyph.file}.svg"]`, glyph.file),
                m('br'),
                m(`span.icon-code.gi-${glyph.file}`, [
                    m('span', 'unicode')]
                 )
            ]));
    }
};

const Page = {
    oncreate: function(vnode) {
            var iconList = vnode.getElementsByClassName('icon-code');
            var icon = vnode.getElementsByClassName('icon-md');
            for (var i=0; i<iconList.length; i++) {
                iconList[i].innerHTML = '\\' + getComputedStyle(icon[i], ':before').content.slice(1, -1).codePointAt(0).toString(16);   
            }
    },
    controller: function() {
        this.list = List.controller({
            visible: (item) => item.file.indexOf(this.filter.searchTerm()) > -1,
            fgColor: () => this.foregroundColor.fgColor()
        });

        this.foregroundColor = new ForegroundColor.controller();
        this.filter = new Filter.controller();
    },
    view: (ctrl) => {
        return [
            m('div.row.text-center', [
                m('div.col-sm-6', Filter.view(ctrl.filter)),
                m('div.col-sm-6', ForegroundColor.view(ctrl.foregroundColor))
            ]),
            m('div.row', List.view(ctrl.list))
        ];
    }
};

m.mount(document.getElementById('page'), Page);
