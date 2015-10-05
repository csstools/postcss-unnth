var postcss = require('postcss');
var parser  = require('postcss-selector-parser');

module.exports = postcss.plugin('postcss-unnth', function () {
	return function (css) {
		css.walkRules(function (rule) {
			if (rule.selector.indexOf(':nth-child') > -1) {
				rule.selector = parser(function (selectors) {
					selectors.each(function (selector) {
						selector.eachPseudo(function (pseudo) {
							if (pseudo.value === ':nth-child') {
								var siblings = [];
								var firstChild = parser.pseudo({ value: ':first-child' });

								// get sibling selectors
								pseudo.parent.nodes.some(function (sibling) {
									if (sibling === pseudo) return true;

									siblings.push(sibling);

									if (sibling.type === 'combinator') {
										siblings = [];
									}
								});

								// add sibling fallbacks
								String(pseudo.nodes).replace('even', '2n').replace('odd', '2n+1').replace(/^([-+]?\d*)(n?)([-+]?\d+)?$/, function ($0, $1, $2, $3) {
									if ($1 && !$2 && !$3) {
										$3 = $1;
										$2 = 'n';
										$1 = '0';
									}

									$1 = parseFloat($1) || 0;
									$3 = parseFloat($3) || 0;

									if ($3 > 1) {
										// move sibling selectors after :nth-child
										siblings.forEach(function (sibling) {
											sibling.removeSelf();

											pseudo.parent.insertAfter(pseudo, sibling);
										});

										// add immediate fallback
										pseudo.parent.insertBefore(pseudo, firstChild);
										pseudo.parent.insertBefore(pseudo, parser.combinator({ value: ' + ' }));

										while (--$3 > 1) {
											pseudo.parent.insertBefore(pseudo, parser.tag({ value: '*' }));
											pseudo.parent.insertBefore(pseudo, parser.combinator({ value: ' + ' }));
										}

										// add selector fallback
										if (!siblings.length) {
											pseudo.parent.insertBefore(pseudo, parser.tag({ value: '*' }));
										}
									} else {
										pseudo.parent.insertAfter(pseudo, firstChild);
									}
								});

								// remove original
								pseudo.removeSelf();
							}
						});
					});
				}).process(rule.selector).result.toString();
			}
		});
	};
});
